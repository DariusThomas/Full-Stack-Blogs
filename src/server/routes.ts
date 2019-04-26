import * as express from 'express';
import db from "./db"
const router = express.Router();

router.get('/api/blogs', async (req, res) => {
    try {
        res.json(await db.Blogs.allBlogs())
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
});

router.get('/api/blogs/:id', async (req, res) => {
    let id: number = req.params.id
    try {
        let [data] = await db.Blogs.oneBlog(id)
        res.json(data)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

router.post('/api/blogs', async (req, res) => {
    let { title, content,tagsArr } = req.body
    try {
        await db.Blogs.createBlog(title, content)
        let blogId:number = (await db.Blogs.blogId())[0]["id"];
       for(let i = 0; i<tagsArr.length;i++) {
        db.BlogTags.createBlogTags(tagsArr[i],blogId)
       }
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

router.put('/api/blogs/:id', async (req,res) =>{
    let { title, content,tagsArr } = req.body;
    let blogId= req.params.id;
    try{
       await db.Blogs.updateBlog(blogId,title,content)
       await db.BlogTags.resetBlogTags(blogId)
       for(let i = 0; i<tagsArr.length;i++) {
        db.BlogTags.createBlogTags(tagsArr[i],blogId)
     }
      res.sendStatus(200)
    } catch(e){
        console.log(e)
        res.sendStatus(500)
    }
})

router.delete('/api/blogs/:id', async (req,res)=>{
    let id = req.params.id
    try{
        await db.Blogs.deleteBlog(id)
        res.sendStatus(200)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
})

router.get('/api/blogs/:id/blogtags', async (req,res)=>{
    let id=req.params.id
    try{
        res.json(await db.BlogTags.getBlogTags(id))
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
})

router.get('/api/tags', async (req,res)=>{
    try{
        res.json(await db.Tags.allTags())
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
})

export default router;