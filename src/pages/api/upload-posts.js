// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { addToStoryblok } from '@/lib/addToStoryblok'
import { UploadFileToStoryblok } from '@/lib/assetUpload'
import convertHtmlToJson from '@/lib/convertHtmlToJson'
import { delay } from '@/lib/delay'
import getNewStoryIDFromOldID from '@/lib/getNewStoryIDFromOldID'

export default async function handler(req, res) {
  let response = await fetch(
    'https://raw.githubusercontent.com/dipankarmaikap/fake-json-data/main/posts.json'
  )
  let posts = await response.json()
  for (let post of posts) {
    let author = post.author
    let categories = post.categories
    let tags = post.tags

    let newAuthor = await getNewStoryIDFromOldID({
      id: author,
      startsWith: 'authors',
    })
    const newTags = await Promise.all(
      tags.map(async (id) => {
        return await getNewStoryIDFromOldID({
          id,
          startsWith: 'tags',
        })
      })
    )
    const newCategories = await Promise.all(
      categories.map(async (id) => {
        return await getNewStoryIDFromOldID({
          id,
          startsWith: 'categories',
        })
      })
    )
    let storyblokImgObj = await UploadFileToStoryblok(post.featuredimage.url)
    await addToStoryblok({
      publish: post.status === 'publish' ? '1' : false, //you can add false value if you want this to be draft
      story: {
        name: post.title,
        slug: post.slug,
        parent_id: 328861618, //Posts Folder id
        content: {
          title: post.title,
          component: 'Post',
          excerpt: convertHtmlToJson(post.excerpt),
          content: convertHtmlToJson(post.content),
          author: newAuthor,
          tags: newTags,
          categories: newCategories,
          featuredimage: {
            ...storyblokImgObj,
            alt: post.featuredimage.alttext,
            name: '',
            focus: '',
            title: '',
            source: '',
            copyright: '',
            fieldtype: 'asset',
            meta_data: {},
            is_external_url: false,
          },
        },
      },
    })
    await delay(500)
  }
  res.status(200).json({
    message: 'Sucess!',
  })
}
