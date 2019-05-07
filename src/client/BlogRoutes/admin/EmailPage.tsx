import * as React from "react"
import {useState} from "react"
import { json as fwt, User} from "../../utils/api"
import {RouteComponentProps} from "react-router-dom"
const EmailPage: React.SFC<IEmailPageProps> = (props) => {
    (function () {
        if (!User || User.userid === null || User.role !== "admin") {
            props.history.push("/")
        } 
    })();


    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [content, setContent] = useState("")

    const handleSubmit=async (e:React.ChangeEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log(User)
        // try{
        //     await fwt('/ContactUs',"POST",{email,subject,content})
        // }catch(e){
        //     throw e
        // }
        setEmail("");
        setContent("");
        setSubject("")
    }

    return (
        <main className ="container d-flex justify-content-center ">
            
            <form 
            className ="form-group mt-3 w-50 p-4 border border-primary rounded shadow-lg"
            onSubmit={handleSubmit}
            >
            <h1 className="text-center">Donations</h1>
                <label>Email</label>
                <input 
                type="text"
                placeholder="Enter email"
                className="input-group my-1 p-1 border border-secondary"
                value={email}
                onChange={(e:any) =>{setEmail(e.target.value)}}
                />
                <label>Subject</label>
                <input 
                type="text"
                placeholder="Type subject"
                className="input-group my-1 p-1 border border-secondary"
                value={subject}
                onChange={(e:any) =>{setSubject(e.target.value)}}
                />
                <label>Body</label>
                <textarea 
                className="input-group my-1 p-1 border border-secondary"
                value={content}
                onChange={(e:any) =>{setContent(e.target.value)}}
                />
        <button className="btn btn-primary border border-dark mt-2">Send</button>
            </form>
        </main>
    )
}

interface IEmailPageProps extends RouteComponentProps{

}

export default EmailPage