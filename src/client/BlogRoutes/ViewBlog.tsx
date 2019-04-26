import * as React from "react";
import { RouteComponentProps, Link } from "react-router-dom"

const ViewBlog: React.SFC<IViewProps> = (props) => {

    const [blog, setBlog] = React.useState(Object);
    const [selectedTags, setSelectedTags] = React.useState([])


    React.useEffect(() => {
        getBlog()
        getPrevTags()
    }, [])

    async function getPrevTags() {
        try {
            let res = await fetch(`/api/blogs/${props.match.params.id}/blogtags`)
            let [data] = await res.json();
            let tagNames: Array<string> = []
            for (let i = 0; i < data.length; i++) {
                tagNames.push(data[i].name)
            }
            setSelectedTags(tagNames)

        } catch (e) {
            console.log(e)
        }
    }
    async function getBlog() {
        try {
            let res = await fetch(`/api/blogs/${props.match.params.id}`)
            let data = await res.json()
            setBlog(data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className="container">

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{blog.title}</h5>
                        <div className="d-flex flex-rows " >
                            {selectedTags.map((selectedTag, i) => {
                                return (
                                    <span key={i}>
                                        <h5 ><span className="mx-1 mt-2 badge badge-info badge-pill">{selectedTag} </span></h5>
                                    </span>
                                )
                            })}
                        </div>
                        <h6 className="card-subtitle mb-2 text-muted">{blog.author}</h6>
                        <p className="card-text">{blog.content}</p>
                        <div className="d-flex justify-content-between">
                            <Link className="btn btn-outline-primary" to='/' >Back</Link>
                            <Link className="btn btn-outline-primary" to={`/ViewBlog/${props.match.params.id}/Edit`}>Edit Blog</Link></div>
                    </div>
                </div>
            </div>
        </>
    )
}

interface IViewProps extends RouteComponentProps<{ id: string }> {

}

export default ViewBlog