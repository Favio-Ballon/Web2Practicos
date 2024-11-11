import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ListaCanciones from "./crud/listCancion.jsx";
import FormCancion from "./crud/formCancion.jsx";
import ListaGeneros from "./crud/listGenero.jsx";
import FormGenero from "./crud/formGenero.jsx";
import ListArtista from "./crud/listArtista.jsx";
import FormArtista from "./crud/formArtista.jsx";
import ListaAlbums from "./crud/listAlbum.jsx";
import FormAlbum from "./crud/formAlbum.jsx";
import App from "./App.jsx";
import Artistas from "./Artistas.jsx";
import VistaArtista from "./vistaArtista.jsx";

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
    {
        path: "/genero/edit/:id",
        element: <FormGenero />,
    },
    {
        path: "/genero/create",
        element: <FormGenero />,
    },
    {
        path: "/artista",
        element: <ListArtista />,
    },
    {
        path: "/artista/edit/:id",
        element: <FormArtista />,
    },
    {
        path: "/artista/create",
        element: <FormArtista />,
    },
    {
        path: "/album",
        element: <ListaAlbums />,
    },
    {
        path: "/album/edit/:id",
        element: <FormAlbum />,
    },
    {
        path: "/album/create",
        element: <FormAlbum />,
    },
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/genero/:id",
        element: <Artistas />,
    },
    {
      path: "/artista/:id",
      element:<VistaArtista/>,
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
