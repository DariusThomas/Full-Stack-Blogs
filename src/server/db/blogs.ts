import { Query } from "./index"

const allBlogs = async () => Query("SELECT a.id as AuthorId, b.id as BlogId, b.title, a.name FROM blogs b JOIN authors a on a.id=b.authorid ORDER BY b._created DESC", [])

const oneBlog = async (id: number) => Query("SELECT a.id as AuthorId, b.id as BlogId, b.title, a.name as Author, b.content FROM blogs b JOIN authors a on a.id=b.authorid WHERE b.id =?", [id])

const createBlog = async (title: string, content: string, authorid: number) => Query("INSERT INTO blogs (title,content,authorid) VALUES(?,?,?)", [title, content, authorid])

const updateBlog = async (blogid: number, title: string, content: string) => Query("UPDATE blogs SET title= ?, content = ? WHERE id= ? ", [title, content, blogid])

const deleteBlog = async (blogid: number) => Query('DELETE FROM blogs WHERE id =?', [blogid])



export default {
    allBlogs,
    oneBlog,
    createBlog,
    updateBlog,
    deleteBlog,
}