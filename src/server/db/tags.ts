import { Query } from "./index"

const allTags = async () => Query('SELECT * FROM tags', [])

const tagId = async (tag: string) => Query('SELECT id FROM tags WHERE name = ?', [tag])

export default {
    allTags,
    tagId,
}