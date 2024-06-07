import { useState } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import CartContext, { Cart, initialCart } from "@/contexts/CartContext"

import MainLayout from "./layouts/MainLayout"

import HomePage from "./pages/Home"
import CategoryPage from "./pages/Category"
import ProductPage from "./pages/Product"
import CheckoutPage from "./pages/Checkout"

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/categories/:category",
        element: <CategoryPage />,
      },
      {
        path: "/products/:slug",
        element: <ProductPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
    ]
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
  const [cart, setCart] = useState<Cart>({
    ...initialCart,
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
    "total": 1000,
    "grandTotal": 1000,
  })

  const calculateTotals = (cart:Cart):Cart => {
    let newCart = { ...cart }

    newCart.total = newCart.products.reduce((total, product) => {
      return total + product.quantity * product.price
    }, 0)
    newCart.vat = newCart.total * 0.2
    newCart.grandTotal = newCart.vat + newCart.shipping + newCart.total

    return newCart
  }

  const updateQuantity = (index:number, quantity:number) => {
    let newCart = { ...cart }

    newCart.products = [
      ...newCart.products.slice(0, index),
      {
        ...newCart.products[index],
        quantity,
      },
      ...newCart.products.slice(index + 1),
    ]
    newCart = calculateTotals(newCart)

    setCart(newCart)
  }

  const removeProduct = (index:number) => {
    let newCart = { ...cart }

    newCart.products = [
      ...newCart.products.slice(0, index),
      ...newCart.products.slice(index + 1),
    ]
    newCart = calculateTotals(newCart)

    setCart(newCart)
  }

  const removeAllProducts = () => {
    let newCart = { ...cart }
    newCart.products = []
    newCart = calculateTotals(newCart)
    setCart(newCart)
  }

  const cartContextValues = {
    cart,
    setCart,
    updateQuantity,
    removeProduct,
    removeAllProducts,
  }

  return (
    <CartContext.Provider value={cartContextValues}>
      <RouterProvider router={router} />
    </CartContext.Provider>
  )
}

export default App