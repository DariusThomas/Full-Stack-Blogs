import * as express from 'express';
import db from "../../db"
import { RequestHandler } from 'express-serve-static-core';
const router = express.Router();

const isAdmin: RequestHandler = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.sendStatus(401)
    } else {
        return next();
    }
}


router.get('/tags', async (req, res) => {
    try {
        res.json(await db.Tags.allTags())
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})


router.get('/', async (req, res) => {
    try {
        res.json(await db.Blogs.allBlogs())
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
});

router.get('/:id', async (req, res) => {
    let id: number = req.params.id
    try {
        let [data] = await db.Blogs.oneBlog(id)
        res.json(data)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})


router.post('/', async (req, res) => {
    let { title, content, tagsArr, authorid } = req.body
    try {
        await db.Blogs.createBlog(title, content, authorid)
        let blogId: number = (await db.Blogs.blogId())[0]["id"];
        for (let i = 0; i < tagsArr.length; i++) {
            db.BlogTags.createBlogTags(tagsArr[i], blogId)
        }
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

router.put('/:id', async (req, res) => {
    let { title, content, tagsArr } = req.body;
    let blogId = req.params.id;
    try {
        await db.Blogs.updateBlog(blogId, title, content)
        await db.BlogTags.resetBlogTags(blogId)
        for (let i = 0; i < tagsArr.length; i++) {
            db.BlogTags.createBlogTags(tagsArr[i], blogId)
        }
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})


router.delete('/:id', async (req, res) => {
    let id = req.params.id
    try {
        await db.Blogs.deleteBlog(id)
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

router.get('/:id/blogtags', async (req, res) => {
    let id = req.params.id
    try {
        res.json(await db.BlogTags.getBlogTags(id))
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

export default router;