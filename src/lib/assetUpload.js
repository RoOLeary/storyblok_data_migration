import FormData from 'form-data'
let spaceID = process.env.STORYBLOK_SPACE_ID
let mapiKey = process.env.STORYBLOK_MAPI_KEY
async function UploadFileToStoryblok(fileUrl) {
  if (!fileUrl) {
    return
  }
  let splitFile = fileUrl?.split('/')
  let fileName = splitFile[splitFile.length - 1]
  try {
    let response = await fetch(
      `https://mapi.storyblok.com/v1/spaces/${spaceID}/assets/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: mapiKey,
        },
        body: JSON.stringify({
          filename: fileName,
          size: '400x500',
        }),
      }
    )
    let data = await response.json()
    let fetchImage = await fetch(fileUrl)
    let imgBuffer = Buffer.from(await fetchImage.arrayBuffer())
    await fileUpload(data, imgBuffer)
    let filename = `https://a.storyblok.com/${data.fields.key}`
    return {
      filename,
      id: data.id,
      alt: '',
      name: '',
      focus: '',
      title: '',
      source: '',
      copyright: '',
      fieldtype: 'asset',
      meta_data: {},
      is_external_url: false,
    }
  } catch (error) {
    console.log(error.message)
  }
}

async function fileUpload(signed_request, file) {
  let form = new FormData()
  for (let key in signed_request.fields) {
    form.append(key, signed_request.fields[key])
  }
  form.append('file', file)
  form.submit(signed_request.post_url, function (err, res) {
    if (err) throw err
  })
}

export { UploadFileToStoryblok }
