import * as React from "react"
import { Link, RouteComponentProps } from "react-router-dom"
import { User, json as fwt} from "../utils/api"

const AccBtn: React.SFC<IAccBtnProps> = (props) => {
    let AccountButton = <></>
    
    if(!User.userid){
        AccountButton =<Link className="btn btn-primary m-2 " to="/Login">Login</Link>
    }else{
        AccountButton =<input type= "button" value ="Logout" className="btn btn-primary m-2 " onClick={handleLogout} />
    }


    async function handleLogout () {

        try{
         await fwt(`/auth/logout/${User.userid}`,"DELETE")
           localStorage.clear()
           location.reload()
        }catch(e){

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
