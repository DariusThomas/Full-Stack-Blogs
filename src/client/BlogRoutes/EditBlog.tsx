import * as React from "react"
import { RouteComponentProps } from "react-router-dom"
import $ from "jquery"
const EditBlog: React.SFC<IEditProps> = (props) => {

    const [blog, setBlog] = React.useState(Object);
    const [blogTitle, setBlogTitle] = React.useState("")
    const [blogContent, setBlogContent] = React.useState("")
    const [allTags, setAllTags] = React.useState([])
    const [selectedTags, setSelectedTags] = React.useState([])
    const [tagIds, setTagIds] = React.useState([])

    React.useEffect(() => {
        getAllTags()
        getBlog()
        getPrevTags()
    }, [])

    async function getPrevTags() {
        try {
            let res = await fetch(`/api/blogs/${props.match.params.id}/blogtags`)
            let [data] = await res.json();
            let tagNames: Array<string> = []
            let tagIds: Array<string> = []
            for (let i = 0; i < data.length; i++) {
                tagNames.push(data[i].name)
                tagIds.push(data[i].tagid)
            }
            setSelectedTags(tagNames)
            setTagIds(tagIds)

        } catch (e) {
            console.log(e)
        }
    }

    async function getAllTags() {
        try {
            let res = await fetch('/api/tags');
            let data = await res.json();
            setAllTags(data)
        } catch (e) {
            console.log(e)
        }
    }

    async function getBlog() {
        let blogTitle: string = ""
        let blogContent: string = ""
        try {
            let res = await fetch(`/api/blogs/${props.match.params.id}`)
            let data = await res.json()
            setBlog(data)
            setBlogTitle(data.title)
            setBlogContent(data.content)

        } catch (e) {
            console.log(e)
        }
    }

    function handleCheckClick(e: any) {
        let tagInt: number = parseInt(e.target.value, 10)
        if (e.target.checked) {
            setSelectedTags([...selectedTags, e.target.id])
            setTagIds([...tagIds, tagInt])
        } else {
            selectedTags.splice(selectedTags.indexOf(e.target.id), 1)
            setSelectedTags([...selectedTags])
            tagIds.splice(tagIds.indexOf(tagInt), 1)
            setTagIds([...tagIds])
        }
    }
    function handleContentChange(e: any) {
        setBlogContent(e.target.value)
    }

    function handleTitleChange(e: any) {
        setBlogTitle(e.target.value)
    }

    async function handleSubmitClick() {
        let data = {
            title: $('#title').val(),
            content: $('#content').val(),
            tagsArr: tagIds
        }
        try {
            await fetch(`/api/blogs/${props.match.params.id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            props.history.push('/')
        } catch (e) {
            console.log(e)
        }
    }
function handleBackClick(){
    props.history.push(`/ViewBlog/${props.match.params.id}`)
}

    async function handleDeleteClick() {
        try {
            await fetch(`/api/blogs/${props.match.params.id}`, {
                method: 'DELETE'
            })
            props.history.push('/')
        } catch (e) {
            console.log(e)
        }

    }
    return (
        <>
            <h2 className="text-center">Edit Blog</h2>
            <div className=" m-3">
                <label > Title</label>
                <input id="title" className=" w-75 form-control" value={blogTitle} onChange={handleTitleChange} type="text" />
            </div>

            <div className="m-3">
                <label > Content</label>
                <div >
                    {allTags.map(tag => {

                        if (tagIds.includes(tag.id)) {
                            return (
                                <span key={tag.id}>
                                    <div className="form-check form-check-inline">
                                        <input id={`${tag.name}`} defaultChecked className="form-check-input" type="checkbox" value={tag.id} onClick={handleCheckClick} />
                                        <label htmlFor={`${tag.name}`} className="form-check-label" >{tag.name}</label>
                                    </div>
                                </span>
                            )
                        } else {
                            return (
                                <span key={tag.id}>
                                    <div className="form-check form-check-inline">
                                        <input id={`${tag.name}`} className="form-check-input" type="checkbox" value={tag.id} onClick={handleCheckClick} />
                                        <label htmlFor={`${tag.name}`} className="form-check-label" >{tag.name}</label>
                                    </div>
                                </span>
                            )
                        }
                    })}
                </div>
                <div className="d-flex flex-rows " >
                    {selectedTags.map((selectedTag, i) => {
                        return (
                            <span key={i}>
                                <h5 ><span className="mx-1 mt-2 badge badge-info badge-pill">{selectedTag} </span></h5>
                            </span>
                        )
                    })}
                </div>
                <textarea id="content" className="w-75 form-control" value={blogContent} onChange={handleContentChange} ></textarea>
            </div>
            <div className="d-flex justify-content-around">
                <button className="m-3 btn btn-outline-primary" onClick={handleBackClick}>Back</button>
                <button className="m-3 btn btn-outline-primary" onClick={handleSubmitClick}>Submit Edit</button>
                <button className="m-3 btn btn-outline-danger" onClick={handleDeleteClick}>Delete Blog</button>
            </div>
        </>

    )
}

interface IEditProps extends RouteComponentProps<{ id: string }> {

}
export default EditBlog