import { useEffect, useState } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import CartContext, { Cart, initialCart } from "@/contexts/CartContext"

import MainLayout from "./layouts/MainLayout"

import HomePage from "./pages/Home"
import CategoryPage from "./pages/Category"
import ProductPage from "./pages/Product"
import CheckoutPage from "./pages/Checkout"

import data from "@/data.json"

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

const getInitialCart = ():Cart => {
  let cart:Cart|null = null

  try {
    const localStorageCart = localStorage.getItem("cart")
    if (localStorageCart) {
      cart = JSON.parse(localStorageCart)
    }
  } catch (e) {
    cart = { ...initialCart }
  }

  return cart
}

const App = () => {
  const [cart, setCart] = useState<Cart>(getInitialCart())

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

  const addProduct = (slug:string, quantity:number) => {
    const product = data.find(product => product.slug === slug)
    
    if (!product) {
      throw new Error("Invalid product")
    }

    let newCart = { ...cart }
    newCart.products = [
      ...newCart.products,
      {
        name: product.name,
        slug: product.slug,
        price: product.price,
        quantity,
      },
    ]
    newCart = calculateTotals(newCart)
    setCart(newCart)
  }

  const cartContextValues = {
    cart,
    setCart,
    updateQuantity,
    addProduct,
    removeProduct,
    removeAllProducts,
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  return (
    <CartContext.Provider value={cartContextValues}>
      <RouterProvider router={router} />
    </CartContext.Provider>
  )
}

export default App