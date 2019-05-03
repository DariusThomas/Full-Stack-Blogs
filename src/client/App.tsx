import * as React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import './scss/app';
import Home from "./BlogRoutes/Home"
import AddBlog from './BlogRoutes/admin/AddBlog';
import ViewBlog from './BlogRoutes/ViewBlog';
import EditBlog from './BlogRoutes/admin/EditBlog';
import Login from './BlogRoutes/admin/Login';
import Register from './BlogRoutes/admin/Register';
import AccountButton from "./BlogRoutes/accountbutton"
import {User} from "./utils/api"
const App: React.SFC<IAppProps> = () => {

    let AdminAddButton = <></>
    if (!User || User.userid === null || User.role !== "admin") {
      AdminAddButton = <></>
    } else {
        AdminAddButton = <Link className="btn btn-primary m-2 " to="/addBlog">Add Blog</Link>
    }


    return (
        <>
            <Router>
                <div className="d-flex justify-content-end">
                    <Link className="btn btn-primary m-2" to="/">Home</Link>
                    <AccountButton />
                    {AdminAddButton}
                </div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/addBlog" component={AddBlog} />
                    <Route exact path="/ViewBlog/:id" component={ViewBlog} />
                    <Route exact path="/ViewBlog/:id/Edit" component={EditBlog} />
                    <Route exact path ="/Login" component ={Login} />
                    <Route exact path ="/Register" component ={Register} />
                </Switch>
            </Router>
        </>
    )
}

interface IAppProps {

}
export default App