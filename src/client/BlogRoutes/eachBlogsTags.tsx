import * as React from "react"

const homeTags: React.SFC<IHomeTagsProps> = (props) => {

    const [selectedTags, setSelectedTags] = React.useState([])
    React.useEffect(()=>{
        getPrevTags(props.id)
    },[])
    async function getPrevTags(id: number) {
        try {
            let res = await fetch(`/api/blogs/${id}/blogtags`)
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
    return (
        <>
            {selectedTags.map((selectedTag, i) => {
                return (
                    <span key={i}>
                        <h5 className="mx-1 inline mt-2 badge badge-info badge-pill">{selectedTag} </h5>
                    </span>
                )
            })}
        </>
    )
}

interface IHomeTagsProps {
    id: number
}
export default homeTags
