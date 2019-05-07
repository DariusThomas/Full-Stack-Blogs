import * as React from "react"
import { json as fwt, SetAccessToken } from "../../utils/api"
import { RouteComponentProps, Link } from "react-router-dom"

const Login: React.SFC<ILoginProps> = (props) => {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [loading, setloading] = React.useState(false);
    const [invalidLoginDiv, setInvalidLoginDiv] = React.useState(<></>)

    async function handleClick(e: any) {
        if (!loading) {
            setloading(true)
            try {
                let result: any = await fwt('/auth/login', 'POST', {
                    email,
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
                    location.reload()
                } else {
                    setInvalidLoginDiv(<div className="alert alert-danger"> Invalid Login Credentials</div>)
                }
            } catch (e) {
                setloading(false)
                throw (e)

            }
        }
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
                <div className="p-4 w-25 d-flex justify-content-center align-items-center border border-info rounded shadow-lg">
                    <div>
                        <h2 className="Text-center mb-2">Login</h2>
                        {invalidLoginDiv}
                        <label htmlFor="loginEmail" className="form-contorl">Email</label>
                        <input id="loginEmail" className="form-control" placeholder="Enter email" onChange={handleEmail} value={email} type="email" />
                        <label htmlFor="loginPassword">Password</label>
                        <input id="loginPassword" className="form-control" placeholder="Enter password" onChange={handlePassword} value={password} type="password" />
                        <input className="btn btn-primary m-1" type="submit" onClick={handleClick} />
                        <div>
                            <Link to="/Register" >Register for an account</Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login

interface ILoginProps extends RouteComponentProps {

}