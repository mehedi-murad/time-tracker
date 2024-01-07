import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Home/Home";

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
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