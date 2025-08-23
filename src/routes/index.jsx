import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home.jsx';
import Imprint from '../pages/Imprint.jsx';
import ProductDetails from "../pages/ProductDetails.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "imprint",
        element: <Imprint />,
    },
    {
        path: "productDetails/:id", // Route with parameter
        element: <ProductDetails />,
    },
    {
        path: "*",
        element: <Home />,
    }
])

export default router;