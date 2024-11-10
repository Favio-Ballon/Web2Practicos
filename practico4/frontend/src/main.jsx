import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ListaCanciones from "./crud/listCancion.jsx";
import FormCancion from "./crud/formCancion.jsx";
import ListaGeneros from "./crud/listGenero.jsx";

const router = createBrowserRouter([
    {
        path: "/canciones",
        element: <ListaCanciones />,
    },
    {
        path: "/cancion/edit/:id",
        element: <FormCancion />,
    },
    {
        path: "/cancion/create",
        element: <FormCancion />,
    },
    {
        path: "/genero",
        element: <ListaGeneros />,
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
