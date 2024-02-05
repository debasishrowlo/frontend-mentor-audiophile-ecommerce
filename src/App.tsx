import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom"

import ProductPage from "./pages/Product"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <p>Hello world!</p>
        <Link to="/products/yx1-earphones">Product page</Link>
      </div>
    ),
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