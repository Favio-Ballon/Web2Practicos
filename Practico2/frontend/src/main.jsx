import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FormReparto from './FormReparto';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListaRepartos from './ListReparto';
import ListaPeliculas from './ListPelicula';
import FormPelicula from './FormPelicula';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/reparto/create",
    element: <FormReparto />
  },
  {
    path: "/reparto",
    element: <ListaRepartos/>
  },
  {
    path: "/reparto/:id",
    element: <FormReparto/>
  },
  {
    path: "/pelicula",
    element: <ListaPeliculas/>
  },
  {
    path: "/pelicula/create",
    element: <FormPelicula />
  },
  {
    path: "/pelicula/:id",
    element: <FormPelicula />
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
