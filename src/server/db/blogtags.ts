import { Query } from './index'

const getBlogTags = async (blogid: number) => Query("call spBlogTags(?) ", [blogid])

const createBlogTags = async (tagid: number, blogid: number) => Query('INSERT INTO BlogTags (tagid,blogid) VALUES(?,?)', [tagid, blogid])

const resetBlogTags = async (blogid: number) => Query("DELETE FROM BlogTags where blogid =?", [blogid])

export default {
    getBlogTags,
    createBlogTags,
    resetBlogTags
}