import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListaPokemon from './crud/listPokemon.jsx';
import ListaTipos from './crud/listTipo.jsx';
import ListaHabilidades from './crud/listHabilidad.jsx';
import FormHabilidad from './crud/formHabilidad.jsx';
import FormPokemon from './crud/formPokemon.jsx';
import FormTipo from './crud/formTipo.jsx';
import App from './App.jsx';
import PokemonDetalle from './pokemonDetalle.jsx';
import Buscador from './buscador.jsx';
const router = createBrowserRouter([
  {
    path: "/pokemon",
    element: <ListaPokemon />,
  },
  {
    path: "/tipo",
    element: <ListaTipos />,
  },
  {
    path: "/habilidad",
    element: <ListaHabilidades />,
  },
  {
    path: "/habilidad/create",
    element: <FormHabilidad />,
  },
  {
    path: "/habilidad/edit/:id",
    element: <FormHabilidad />,
  },
  {
    path: "/tipo/create",
    element: <FormTipo />,
  },
  {
    path: "/tipo/edit/:id",
    element: <FormTipo />,
  },
  {
    path: "/pokemon/create",
    element: <FormPokemon />,
  },
  {
    path: "/pokemon/edit/:id",
    element: <FormPokemon />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pokemon/:id",
    element: <PokemonDetalle />,
  },
  {
    path: "/search/tipo/:tipo",
    element: <Buscador />,
  },
  {
    path: "/search/pokemon/:name",
    element: <Buscador />,
  }




]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
