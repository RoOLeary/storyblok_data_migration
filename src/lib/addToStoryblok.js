let spaceID = process.env.STORYBLOK_SPACE_ID
let mapiKey = process.env.STORYBLOK_MAPI_KEY
async function addToStoryblok(data) {
  try {
    await fetch(`https://mapi.storyblok.com/v1/spaces/${spaceID}/stories/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: mapiKey,
      },
      body: JSON.stringify(data),
    })
  } catch (error) {
    console.log(error.message)
  }
}
export { addToStoryblok }
