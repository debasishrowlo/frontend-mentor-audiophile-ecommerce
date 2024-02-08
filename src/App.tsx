import { createBrowserRouter, RouterProvider } from "react-router-dom"

import HomePage from "./pages/Home"
import ProductPage from "./pages/Product"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/products/:slug",
    element: <ProductPage />,
  },
  // TODO: 404 page
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App