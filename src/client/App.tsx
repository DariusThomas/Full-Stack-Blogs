import * as React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import './scss/app';
import Home from "./BlogRoutes/Home"
import AddBlog from './BlogRoutes/AddBlog';
import ViewBlog from './BlogRoutes/ViewBlog';
import EditBlog from './BlogRoutes/EditBlog';

const App: React.SFC<IAppProps> = () => {
    return (
        <>
            <Router>
                <div className="d-flex justify-content-end">
                    <Link className="btn btn-primary m-2" to="/">Home</Link>
                    <Link className="btn btn-primary m-2 " to="/addBlog">Add Blog</Link>
                </div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/addBlog" component={AddBlog} />
                    <Route exact path="/ViewBlog/:id" component={ViewBlog} />
                    <Route exact path="/ViewBlog/:id/Edit" component={EditBlog} />
                </Switch>
            </Router>
        </>
    )
}

interface IAppProps {

}
export default App