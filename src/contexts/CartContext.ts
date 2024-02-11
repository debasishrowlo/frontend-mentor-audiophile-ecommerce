import { createContext } from "react"

export type Cart = {
  products: Array<{
    name: string,
    slug: string,
    price: number,
    quantity: number,
  }>,
  total: number,
  shipping: number,
  vat: number,
  grandTotal: number,
}

const defaultValue:{
  cart: Cart,
  setCart: React.Dispatch<React.SetStateAction<Cart>>,
} = {
  cart: {
    products: [],
    total: 0,
    shipping: 0,
    vat: 0,
    grandTotal: 0,
  },
  setCart: () => {},
}

const CartContext = createContext(defaultValue)

export default CartContext