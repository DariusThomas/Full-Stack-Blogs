import * as React from "react"
import { Link } from "react-router-dom"
import {User, json as fwt } from "../utils/api"

const AccBtn: React.SFC<IAccBtnProps> = (props) => {

    const [AccountButton, setAccountButton] = React.useState(<></>)
    

    React.useEffect(() => {
        checkLogin()
    },[])

    async function handleLogout() {
        try {
            await fwt(`/auth/logout/${User.userid}`, "DELETE")
            localStorage.clear()
            location.reload()
        } catch (e) {
            throw (e)
        }
    }


    function checkLogin() {
        if (!User.userid) {
            setAccountButton(<Link className="btn btn-primary m-2 " to="/Login">Login</Link>)
        } else {
            setAccountButton(<input type="button" value="Logout" className="btn btn-primary m-2 " onClick={handleLogout} />)
        }

    }

    return (
        <>
            {AccountButton}
        </>
    )
}

interface IAccBtnProps {

}

export default AccBtn