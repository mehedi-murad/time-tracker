import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Home/Home";
import Login from "../Authentication/Login/Login";
import SignUp from "../Authentication/SignUp/SignUp";
import Dashboard from "../Dashboard/Dashboard";
import UserProfile from "../Dashboard/UserProfile/UserProfile";
import CreateTask from "../Dashboard/CreateTask/CreateTask";

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
            // {
            //     path: "toDo",
            //     element:<ToDo></ToDo>
            // },
            // {
            //     path: "updateToDo/:id",
            //     element:<UpdateToDo></UpdateToDo>,
            //     loader: ({params}) => fetch(`https://task-management-server-lovat.vercel.app/tasks/${params.id}`)
            // }
        ]
    }
])

export default Routes;