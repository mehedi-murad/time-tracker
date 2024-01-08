import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Home/Home";
import Login from "../Authentication/Login/Login";
import SignUp from "../Authentication/SignUp/SignUp";

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
    }
    // {
    //     path: 'serviceDetails',
    //     element: <ServiceDetails></ServiceDetails>,
    //     children:[
    //         {
    //             path: 'web',
    //             element: <Web></Web>
    //         },
    //         {
    //             path: 'ui',
    //             element:<Ui></Ui>
    //         },
    //         {
    //             path: 'graphic',
    //             element:<Graphic></Graphic>
    //         }
    //     ]
    // }
])

export default Routes;