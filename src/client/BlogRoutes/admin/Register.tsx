import * as React from "react"
import { json as fwt, SetAccessToken } from "../../utils/api"
import { RouteComponentProps, Link } from "react-router-dom"
const Login: React.SFC<IRegisterProps> = (props) => {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [user, setUser] = React.useState("")
    const [loading, setloading] = React.useState(false);
    const [invalidRegisterDiv, setInvalidRegisterDiv] = React.useState(<></>)

    async function handleClick(e: any) {
        if (!loading) {
            setloading(true)
            try {
                let result: any = await fwt('/auth/register', 'POST', {
                    email,
                    user,
                    password,
                })
                if (result) {
                    let userData = await result.json()
                    SetAccessToken(userData.token, {
                        userid: userData.userid,
                        role: userData.role
                    })
                    if (result.role === 'admin') {
                        setloading(false)
                        props.history.push('/addBlog')
                    } else {
                        setloading(false)
                        props.history.push('/');
                    }
                } else {
                    setInvalidRegisterDiv(<div className="alert alert-danger"> An accout using that email already exists</div>)
                    setPassword("")
                }
            } catch (e) {
                setloading(false)
                throw (e)

            }
        }
    }

    
    function handleUser(e: any) {
        setUser(e.target.value)
    }

    function handleEmail(e: any) {
        setEmail(e.target.value)
    }

    function handlePassword(e: any) {
        setPassword(e.target.value)
    }
    return (
        <>
            <div className="h-75 d-flex justify-content-center align-items-center">
                <div className="h-75 w-50 d-flex justify-content-center align-items-center border border-info rounded shadow-lg">
                    <div>
                        <h2 className="Text-center mb-2">Register</h2>
                        {invalidRegisterDiv}
                        <label htmlFor="loginUser" className="form-contorl">Full Name</label>
                        <input id="loginUser" className="form-control" placeholder="Enter full Name" onChange={handleUser} value={user} type="user" />
                        <label htmlFor="loginEmail" className="form-contorl">Email</label>
                        <input id="loginEmail" className="form-control" placeholder="Enter email" onChange={handleEmail} value={email} type="email" />
                        <label htmlFor="loginPassword">Password</label>
                        <input id="loginPassword" className="form-control" placeholder="Enter password" onChange={handlePassword} value={password} type="password" />
                        <input className="btn btn-primary m-1" type="submit" onClick={handleClick} />
                        <div>
                            <Link to="/Login" >I already have an account</Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login

interface IRegisterProps extends RouteComponentProps {

}