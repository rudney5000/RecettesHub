import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import {HomePage} from "../pages/HomePage.tsx";
import FavoritesPage from "../pages/FavoritesPage.tsx";
import RecipeDetailPage from "../pages/RecipeDetailPage.tsx";

export const router = createBrowserRouter([
    {
        element: <App/>,
        children: [
            {
                path: "/",
                element: <HomePage/>
            },
            {
                path: "/favorites",
                element: <FavoritesPage/>
            },
            {
                path: "/recipe/:id",
                element: <RecipeDetailPage/>
            }
        ]
    }
]);