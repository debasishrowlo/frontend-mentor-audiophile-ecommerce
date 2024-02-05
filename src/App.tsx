import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import ProductPage from "./pages/Product"

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/products/:id",
    element: <ProductPage />,
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App