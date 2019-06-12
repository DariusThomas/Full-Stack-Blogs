import * as React from "react"
import { Link } from "react-router-dom"
import Tags from "./eachBlogsTags"
import { json as fwt } from "../utils/api"
const HomePage: React.SFC<IHomeProps> = () => {
    const [blogs, setBlogs] = React.useState([])


    React.useEffect(() => {
        getBlogs()
    }, [])

    async function getBlogs() {
        try {
            let res = await fwt('/api/blogs')
            let data = await res.json()
            setBlogs(data)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    {blogs.map(blog => {
                        return (
                            <div className="col-md-4 col-sm-12 my-3" key={blog.BlogId}>
                                <div className="card border border-dark" key={blog.BlogId} >
                                    <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGy_lym00f0Top6aWL7PmOt2OsxXr-epQDtAYFL1Ow_wyv4b47" alt="Card image cap"></img>
                                    <div className="card-body">
                                        <h5 className="card-title">{blog.title}</h5>
                                        <Tags id={blog.BlogId}/>
                                        <p className="card-text">by {blog.name}</p>
                                        <Link className="btn btn-primary" to={`/ViewBlog/${blog.BlogId}`}>Read More</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

interface IHomeProps {

}
export default HomePage
