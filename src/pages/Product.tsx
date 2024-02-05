import { useState } from "react"
import { Link, useParams } from "react-router-dom"

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
  similarProducts: Array<{
    slug: string,
    name: string,
  }>,
}

const getProduct = (slug:string) => {
  const productData = data.find(product => product.slug === slug)

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
    similarProducts: productData.others.map(product => ({
      slug: product.slug,
      name: product.name,
    })),
  }

  return product
}

const Product = () => {
  const params = useParams()

  const [product, setProduct] = useState(getProduct(params.slug))
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

  const categories = [
    { name: "Headphones", url: "/categories/headphones" },
    { name: "Speakers", url: "/categories/speakers" },
    { name: "Earphones", url: "/categories/earphones" },
  ]
  const menuItems = [
    { name: "Home", url: "/" },
    ...categories,
  ]

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
            {menuItems.map((category, index) => (
              <a 
                href="#" 
                className="text-14 tracking-widest font-bold text-white uppercase"
                key={index}
              >
                {category.name}
              </a>
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
          </div>
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
        <div className="md:hidden">
          <img src={require(`../assets/product-${product.slug}/mobile/image-gallery-1.jpg`)} />
          <img src={require(`../assets/product-${product.slug}/mobile/image-gallery-2.jpg`)} />
          <img src={require(`../assets/product-${product.slug}/mobile/image-gallery-3.jpg`)} />
        </div>
        <div className="hidden md:flex">
          <div className="w-1/2">
            <img src={require(`../assets/product-${product.slug}/tablet/image-gallery-1.jpg`)} />
            <img src={require(`../assets/product-${product.slug}/tablet/image-gallery-2.jpg`)} />
          </div>
          <div className="w-1/2">
            <img src={require(`../assets/product-${product.slug}/tablet/image-gallery-3.jpg`)} />
          </div>
        </div>
        <div>
          <p>You may also like</p>
          {product.similarProducts.map((similarProduct, index) => {
            return (
              <div>
                <img src={require(`../assets/shared/mobile/image-${similarProduct.slug}.jpg`)} />
                <p>{similarProduct.name}</p>
                <Link to={`/products/${similarProduct.slug}`}>SEE PRODUCT</Link>
              </div>
            )
          })}
        </div>
        <img src={require(`../assets/shared/mobile/image-best-gear.jpg`)} />
        <p>Bringing you the best audio gear</p>
        <p>Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
        <div>
          {categories.map((category, index) => {
            return (
              <div>
                <img src={require(`../assets/shared/mobile/${category.name.toLowerCase()}.png`)} />
                {/* <img src={require(`../assets/shared/mobile/speakers.png`)} /> */}
                <p>{category.name}</p>
                <Link to={category.url}>SHOP</Link>
              </div>
            )
          })}
        </div>
      </main>
      <footer className="bg-black">
        <img src={logo} />
        <ul>
          {menuItems.map((category, index) => (
            <li>
              <Link 
                to={`/categories/${category.name.toLowerCase()}`}
                key={index}
                className="text-white"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-white">Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.</p>
        <p className="text-white">Copyright 2021. All Rights Reserved</p>
        <div className="flex justify-center">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 448 512"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white w-10 h-10"
          >
            <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" />
          </svg>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white w-10 h-10"
          >
            <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
          </svg>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 448 512"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white w-10 h-10"
          >
            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
          </svg>
        </div>
      </footer>
    </>
  )
}

export default Product