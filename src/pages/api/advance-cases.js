import * as cheerio from 'cheerio'

let exampleHtml = `
<p>This is a paragraph</p>
<img src="https://images.pexels.com/photos/1741206/pexels-photo-1741206.jpeg" alt="Beautiful Cat" />
<a href="https://dipankarmaikap.com/">My Website</a>
<img src="https://images.pexels.com/photos/3361739/pexels-photo-3361739.jpeg" alt="Cute puppy" />

`

export default async function handler(req, res) {
  let newHtml = modifyHtmlImages(exampleHtml)
  res.status(200).json({ message: 'Sucess!', exampleHtml, newHtml })
}

async function modifyHtmlImages(html) {
  let $ = cheerio.load(html, null, false)
  let $images = $('img')
  $images.each((i, e) => {
    let attribs = e.attribs
    let imageUrl = attribs.src
    // We can now upload this image to Storyblok
    // let {filename} = await UploadFileToStoryblok(author.avatar_url)
    //Once we have the url we can replace the src like below
    $(e).attr('src', 'https://example.com/image.jpg')
  })
  let content = $.html()
  return content
}
