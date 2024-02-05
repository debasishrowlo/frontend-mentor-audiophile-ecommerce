import { useMemo, useState } from "react"
import { useParams } from "react-router-dom"

import logo from "@/assets/shared/desktop/logo.svg"
import hamburgerIcon from "@/assets/shared/tablet/icon-hamburger.svg"
import cartIcon from "@/assets/shared/desktop/icon-cart.svg"

import data from "@/data.json" 

type Product = {
  id: number,
  name: string,
  price: number,
  slug: string,
  new: boolean,
  description: string,
  features: string,
  includedProducts: Array<{
    quantity: number,
    name: string,
  }>,
  gallery: {
    first: {
      mobile: string,
      tablet: string,
      desktop: string,
    },
    second: {
      mobile: string,
      tablet: string,
      desktop: string,
    },
    third: {
      mobile: string,
      tablet: string,
      desktop: string,
    },
  },
}

const getProduct = (id:number) => {
  const productData = data.find(product => product.id === Number(id))
  const product:Product = {
    id: productData.id,
    name: productData.name,
    price: productData.price,
    slug: productData.slug,
    new: productData.new,
    description: productData.description,
    features: productData.features,
    includedProducts: productData.includes.map(includedProduct => ({
      name: includedProduct.item,
      quantity: includedProduct.quantity,
    })),
    gallery: productData.gallery,
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
    <>
      <header className="sticky top-0 left-0 bg-black">
        <div className="container mx-auto py-8 flex items-center justify-between">
          <button type="button" className="px-6 md:px-8 lg:hidden">
            <img src={hamburgerIcon} />
          </button>
          <div className="flex justify-center md:grow md:justify-start lg:grow-0">
            <img src={logo} />
          </div>
          <div className="hidden space-x-8 lg:block">
            {["Home", "Headphones", "Speakers", "Earphones"].map((item, index) => (
              <a href="#" className="text-14 tracking-widest font-bold text-white uppercase" key={index}>{item}</a>
            ))}
          </div>
          <button type="button" className="px-6 md:px-8">
            <img src={cartIcon} />
          </button>
        </div>
      </header>
      <main>
        <div className="container mx-auto mt-4 md:mt-8 lg:mt-20">
          <a href="#" className="px-6 text-16 font-medium opacity-50 md:px-8 lg:px-0">Go Back</a>
        </div>
        <div className="container mx-auto mt-6 px-6 md:px-8 md:flex md:items-center md:space-x-[70px] lg:space-x-[125px] lg:px-0">
          <div className="rounded-8 overflow-hidden md:w-2/5 lg:w-1/2">
            <img src={require(`../assets/product-${product.slug}/mobile/image-product.jpg`)} />
          </div>
          <div className="mt-8 md:w-3/5 md:mt-0 md:py-11 lg:w-1/2">
            {product.new && (
              <p className="text-14 tracking-[10px] text-orange-200 uppercase md:text-12 lg:text-14">New Product</p>
            )}
            <p className="mt-6 text-28 font-bold tracking-wider uppercase md:leading-8 lg:text-40 lg:leading-[44px]">{product.name}</p>
            <p className="mt-6 text-16 font-medium leading-6 opacity-50 md:mt-8">{product.description}</p>
            <p className="mt-6 text-18 font-bold tracking-wider md:mt-8">$ {product.price}</p>
            <div className="mt-8 flex">
              <div className="flex items-center bg-gray-200">
                <button 
                  type="button" 
                  className="w-12 h-12 flex items-center justify-center text-14 font-bold text-black/50 hover:text-orange-200 transition-colors transition-300"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <p className="w-6 text-center text-14 font-bold tracking-wide">{quantity}</p>
                <button 
                  type="button" 
                  className="w-12 h-12 flex items-center justify-center text-14 font-bold text-black/50 hover:text-orange-200 transition-colors transition-300"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <button 
                type="button" 
                className="ml-4 px-8 bg-orange-200 hover:bg-orange-100 text-14 font-bold tracking-wide text-white uppercase transition-colors transition-300"
              >
                Add to Cart
              </button>
            </div>
            <div className="mt-22">
              <p>FEATURES</p>
              <p className="whitespace-pre-line">{product.features}</p>
            </div>
            <p>IN THE BOX</p>
            <ul>
              {product.includedProducts.map(((includedProduct, index) => (
                <li key={index}>
                  {includedProduct.quantity}x {includedProduct.name}
                </li>
              )))}
            </ul>
            <img src={require(`../assets/product-${product.slug}/mobile/image-gallery-1.jpg`)} />
            <img src={require(`../assets/product-${product.slug}/mobile/image-gallery-2.jpg`)} />
            <img src={require(`../assets/product-${product.slug}/mobile/image-gallery-3.jpg`)} />
          </div>
        </div>
      </main>
    </>
  )
}

export default Product