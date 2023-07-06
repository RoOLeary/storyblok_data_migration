// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { addToStoryblok } from '@/lib/addToStoryblok'
import { UploadFileToStoryblok } from '@/lib/assetUpload'
import { delay } from '@/lib/delay'

export default async function handler(req, res) {
  let response = await fetch(
    'https://raw.githubusercontent.com/dipankarmaikap/fake-json-data/main/authors.json'
  )
  let authors = await response.json()
  for (let author of authors) {
    let storyblokImgObj = await UploadFileToStoryblok(author.avatar_url)

    await addToStoryblok({
      publish: '1', //you can add false value if you want this to be draft
      story: {
        name: author.name,
        slug: author.slug,
        parent_id: 328835062, //Authors Folder id
        content: {
          id: author.id,
          name: author.name,
          component: 'Author',
          description: author.description,
          avatar: {
            ...storyblokImgObj,
            alt: author.name,
          },
          links: author.links.map((link) => {
            return {
              ...link,
              component: 'Link',
            }
          }),
        },
      },
    })
    await delay(500)
  }
  res.status(200).json({ message: 'Sucess!' })
}
