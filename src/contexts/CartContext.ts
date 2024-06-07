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

export const initialCart:Cart = {
  products: [],
  total: 0,
  grandTotal: 0,
  shipping: 50,
  vat: 0,
}

const defaultValue:{
  cart: Cart,
  setCart: React.Dispatch<React.SetStateAction<Cart>>,
  addProduct: Function,
  updateQuantity: Function,
  removeProduct: Function,
  removeAllProducts: Function,
} = {
  cart: { ...initialCart },
  setCart: () => {},
  addProduct: () => {},
  updateQuantity: () => {},
  removeProduct: () => {},
  removeAllProducts: () => {},
}

const CartContext = createContext(defaultValue)

export default CartContext