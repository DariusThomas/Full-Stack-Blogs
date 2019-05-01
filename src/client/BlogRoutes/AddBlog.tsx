import * as React from "react";
import $ from "jquery"
import { RouteComponentProps } from "react-router-dom"


const AddBlog: React.SFC<IAddBlogProps> = (props) => {
    const [allTags, setAllTags] = React.useState([])

    React.useEffect(() => {
        getAllTags()
    }, [])

    async function getAllTags() {
        try {
            let res = await fetch('/api/blogs/tags');
            let data = await res.json();
            setAllTags(data)
        } catch (e) {
            console.log(e)
        }
    }

    const [selectedTags, setSelectedTags] = React.useState([])
    const [tagIds, setTagIds] = React.useState([])

    function handleCheckChange(e: any) {
        let tagInt = parseInt(e.target.value, 10)
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

    async function handleClick() {
        let data = {
            title: $('#title').val(),
            content: $('#content').val(),
            tagsArr: tagIds
        }
        try {
            await fetch('/api/blogs', {
                method: "POST",
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
    return (
        <>
            <div className=" m-3">
                <label > Title</label>
                <input id="title" className=" w-75 form-control" type="text" />
            </div>

            <div className="m-3">
                <label > Content</label>
                <div >
                    {allTags.map(tag => {
                        return (
                            <span key={tag.id}>
                                <div className="form-check form-check-inline">
                                    <input id={`${tag.name}`} className="form-check-input" type="checkbox" value={tag.id} onChange={handleCheckChange} />
                                    <label htmlFor={`${tag.name}`} className="form-check-label" >{tag.name}</label>
                                </div>
                            </span>
                        ) 
                    })}
                </div>
                <div className="d-flex flex-rows" >
                    {selectedTags.map((selectedTag, i) => {
                        return (
                            <span key={i}>
                                <h5 ><span className="mx-1 mt-2 badge badge-info badge-pill">{selectedTag} </span></h5>
                            </span>
                        )
                    })}
                </div>
                <textarea id="content" className="w-75 form-control" ></textarea>
            </div>
            <button className="m-3 btn btn-outline-primary" onClick={handleClick}>Post Blog</button>
        </>

    )
}

interface IAddBlogProps extends RouteComponentProps {

}
export default AddBlog