import { useMemo, useState } from "react"
import { useParams } from "react-router-dom"

import data from "@/data.json" 

type Product = {
  id: number,
  name: string,
  price: number,
}

const getProduct = (id:number) => {
  const productData = data.find(product => product.id === Number(id))
  const product:Product = {
    id: productData.id,
    name: productData.name,
    price: productData.price,
  }

  return product
}

const Product = () => {
  const params = useParams()

  const product = useMemo(() => getProduct(Number(params.id)), [params.id])
  const [quantity, setQuantity] = useState(1)
  const [cart, setCart] = useState([])

  const addToCart = () => {
    const productIndex = cart.findIndex(cartProduct => cartProduct.id === product.id)

    if (productIndex === -1) {
      setCart([
        ...cart,
        {
          id: product.id,
          quantity,
        }
      ])
    } else {
      setCart([
        ...cart.slice(0, productIndex),
        {
          ...cart[productIndex],
          quantity: cart[productIndex].quantity + quantity,
        },
        ...cart.slice(productIndex + 1),
      ])
    }

    setQuantity(1)
  }

  return (
    <div className="p-10 text-32">
      <p>{product.name}</p>
      <p>{product.price}</p>
      <div>
        <button 
          type="button" 
          className="px-4 py-1 border border-black"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          -
        </button>
        <span className="px-4">{quantity}</span>
        <button 
          type="button" 
          className="px-4 py-1 border border-black"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </div>
      <button type="button" onClick={() => addToCart()}>Add To Cart</button>
    </div>
  )
}

export default Product