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
  // const [cart, setCart] = useState<Cart>({
  //   products: [],
  //   total: 0,
  //   shipping: 0,
  //   vat: 0,
  //   grandTotal: 0,
  // })
  // console.log(cart)
  const [cart, setCart] = useState<Cart>({
    "products": [
      {
        "name": "XX99 Mark II",
        "slug": "xx99-mark-two-headphones",
        "price": 599,
        "quantity": 1,
      },
      {
        "name": "XX59",
        "slug": "xx59-headphones",
        "price": 899,
        "quantity": 2,
      },
      {
        "name": "YX1 Wireless Earphones",
        "slug": "yx1-earphones",
        "price": 599,
        "quantity": 1,
      },
    ],
    "total": 599,
    "shipping": 0,
    "vat": 0,
    "grandTotal": 599
  })

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <RouterProvider router={router} />
    </CartContext.Provider>
  )
}

export default App