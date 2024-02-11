import { useState } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import CartContext, { Cart } from "@/contexts/CartContext"

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
  const [cart, setCart] = useState<Cart>({
    products: [],
    total: 0,
    shipping: 0,
    vat: 0,
    grandTotal: 0,
  })

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <RouterProvider router={router} />
    </CartContext.Provider>
  )
}

export default App