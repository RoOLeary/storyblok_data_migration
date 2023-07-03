// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { addToStoryblok } from '@/lib/addToStoryblok'
import { delay } from '@/lib/delay'

export default async function handler(req, res) {
  let response = await fetch(
    'https://raw.githubusercontent.com/dipankarmaikap/fake-json-data/main/categories.json'
  )
  let categories = await response.json()
  for (let category of categories) {
    await addToStoryblok({
      publish: '1', //you can add false value if you want this to be draft
      story: {
        name: category.name,
        slug: category.slug,
        parent_id: 328829827, //Category Folder id
        content: {
          id: category.id,
          name: category.name,
          component: 'Category',
          description: category.description,
        },
      },
    })
    await delay(500)
  }
  res.status(200).json({ message: 'Sucess!' })
}
