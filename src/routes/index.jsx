import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home.jsx';
import Imprint from '../pages/Imprint.jsx';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "imprint",
        element: <Imprint />,
    },
])

export default router;