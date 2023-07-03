import TurndownService from 'turndown'
import pkg from 'storyblok-markdown-richtext'

const { markdownToRichtext } = pkg
const turndownService = new TurndownService()

export default function convertHtmlToJson(html) {
  if (!html) return
  return markdownToRichtext(turndownService.turndown(html))
}
