import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import {HomePage} from "../pages/HomePage.tsx";

export const router = createBrowserRouter([
    {
        element: <App/>,
        children: [
            {
                path: "/",
                element: <HomePage/>
            }
        ]
    }
]);