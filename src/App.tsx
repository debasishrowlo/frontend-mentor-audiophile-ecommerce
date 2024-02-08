import { createBrowserRouter, RouterProvider } from "react-router-dom"

import HomePage from "./pages/Home"
import ProductPage from "./pages/Product"
import CheckoutPage from "./pages/Checkout"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/products/:slug",
    element: <ProductPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  // TODO: 404 page
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App