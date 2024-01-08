import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Home/Home";
import Login from "../Authentication/Login/Login";
import SignUp from "../Authentication/SignUp/SignUp";
import Dashboard from "../Dashboard/Dashboard";
import UserProfile from "../Dashboard/UserProfile/UserProfile";
import CreateTask from "../Dashboard/CreateTask/CreateTask";
import AllTasks from "../Dashboard/AllTasks/AllTasks";
import UpdateTask from "../Dashboard/UpdateTask/UpdateTask";

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path:'/login',
                element: <Login></Login>
            },
            {
                path:'/signup',
                element:<SignUp></SignUp>
            }
        ]
    },
    {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
        children:[
            {
                path:"userProfile",
                element:<UserProfile></UserProfile>
            },
            {
                path: "createTask",
                element:<CreateTask></CreateTask>
            },
            {
                path: "allTask",
                element:<AllTasks></AllTasks>
            },
            {
                path: "updateTask/:id",
                element:<UpdateTask></UpdateTask>,
                loader: ({params}) => fetch(`http://localhost:5000/tasks/${params.id}`)
            }
        ]
    }
])

export default Routes;