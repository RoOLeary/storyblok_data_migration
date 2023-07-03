export default async function getNewStoryIDFromOldID({ startsWith, id }) {
  let readAcessKey = process.env.STORYBLOK_ACESS_KEY
  let url = `https://api.storyblok.com/v2/cdn/stories?token=${readAcessKey}&filter_query[id][in]=${id}&starts_with=${startsWith}/`
  let res = await fetch(url)
  let data = await res.json()
  let StoryID = data?.stories[0]?.uuid
  return StoryID
}
