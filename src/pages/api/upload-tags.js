// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { addToStoryblok } from '@/lib/addToStoryblok'
import { delay } from '@/lib/delay'

export default async function handler(req, res) {
  let response = await fetch(
    'https://raw.githubusercontent.com/dipankarmaikap/fake-json-data/main/tags.json'
  )
  let tags = await response.json()
  for (let tag of tags) {
    await addToStoryblok({
      publish: '1', //you can add false value if you want this to be draft
      story: {
        name: tag.name,
        slug: tag.slug,
        parent_id: 328808329, //Folder id
        content: {
          id: tag.id,
          name: tag.name,
          component: 'tag',
          description: tag.description,
        },
      },
    })
    await delay(500)
  }
  res.status(200).json({ message: 'Sucess!' })
}
