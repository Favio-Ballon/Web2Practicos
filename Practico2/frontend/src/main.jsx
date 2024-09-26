import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FormReparto from './FormReparto';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListaRepartos from './ListReparto';
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
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
