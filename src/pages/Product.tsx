import { useState } from "react"
import { Link, useParams } from "react-router-dom"

import logo from "@/assets/shared/desktop/logo.svg"
import hamburgerIcon from "@/assets/shared/tablet/icon-hamburger.svg"
import cartIcon from "@/assets/shared/desktop/icon-cart.svg"
import facebookIcon from "@/assets/shared/desktop/icon-facebook.svg"
import twitterIcon from "@/assets/shared/desktop/icon-twitter.svg"
import instagramIcon from "@/assets/shared/desktop/icon-instagram.svg"

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

  const year = (new Date()).getFullYear()

  return (
    <>
      <header className="sticky top-0 left-0 bg-black">
        <div className="container mx-auto px-6 py-8 flex items-center justify-between md:px-10 lg:px-0">
          <button type="button" className="lg:hidden">
            <img src={hamburgerIcon} />
          </button>
          <div className="ml-6 flex justify-center md:grow md:justify-start lg:grow-0 lg:ml-0">
            <img src={logo} />
          </div>
          <div 
            className="hidden space-x-8 lg:block"
          >
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
          <button type="button">
            <img src={cartIcon} />
          </button>
        </div>
      </header>
      <main>
        <section className="product-page__container mt-4 md:mt-8 lg:mt-20">
          <a href="#" className="text-16 font-medium opacity-50">Go Back</a>
        </section>
        <section className="product-page__container mt-6 md:flex md:items-center md:space-x-[70px] lg:space-x-[125px]">
          <div className="rounded-8 overflow-hidden md:w-2/5 lg:w-1/2">
            <img src={require(`@/assets/product-${product.slug}/mobile/image-product.jpg`)} className="md:hidden" />
            <img src={require(`@/assets/product-${product.slug}/tablet/image-product.jpg`)} className="hidden md:block lg:hidden" />
            <img src={require(`@/assets/product-${product.slug}/desktop/image-product.jpg`)} className="hidden lg:block" />
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
        </section>
        <section className="product-page__container mt-22 md:mt-32 lg:mt-40 lg:flex">
          <div className="lg:w-2/3">
            <p className="text-24 font-bold md:text-32">FEATURES</p>
            <p className="mt-6 whitespace-pre-line opacity-50 lg:mt-8 lg:pr-20">{product.features}</p>
          </div>
          <div className="mt-28 lg:w-1/3 md:flex lg:mt-0 lg:block">
            <p className="text-24 font-bold md:w-1/2 md:text-32 lg:w-full">IN THE BOX</p>
            <ul className="mt-8 md:w-1/2 md:mt-0 lg:mt-3 lg:w-full">
              {product.includedProducts.map(((includedProduct, index) => (
                <li key={index} className="mt-2 first:mt-0 lg:mt-3">
                  <span className="font-bold text-orange-200">{includedProduct.quantity}x</span> 
                  <span className="ml-5 opacity-50">{includedProduct.name}</span>
                </li>
              )))}
            </ul>
          </div>
        </section>
        <section className="product-page__container mt-22">
          <div className="md:hidden">
            <img src={require(`@/assets/product-${product.slug}/mobile/image-gallery-1.jpg`)} className="rounded-8 shadow-[0_4px_4px_rgba(0,0,0,1)]" />
            <img src={require(`@/assets/product-${product.slug}/mobile/image-gallery-2.jpg`)} className="mt-5 rounded-8 shadow-[0_4px_4px_rgba(0,0,0,1)]" />
            <img src={require(`@/assets/product-${product.slug}/mobile/image-gallery-3.jpg`)} className="mt-5 rounded-8 shadow-[0_4px_4px_rgba(0,0,0,1)]" />
          </div>
          <div className="product-page__container hidden md:flex gap-5">
            <div className="w-2/5 flex flex-col justify-between gap-5">
              <div
                className="h-1/2 bg-cover rounded-8"
                style={{ backgroundImage: `url(${require(`@/assets/product-${product.slug}/tablet/image-gallery-1.jpg`)})` }}
              >
              </div>
              <div
                className="h-1/2 bg-cover rounded-8"
                style={{ backgroundImage: `url(${require(`@/assets/product-${product.slug}/tablet/image-gallery-2.jpg`)})` }}
              >
              </div>
            </div>
            <div className="w-3/5 bg-cover rounded-8">
              <img src={require(`@/assets/product-${product.slug}/tablet/image-gallery-3.jpg`)} className="rounded-8" />
            </div>
          </div>
        </section>
        <section className="product-page__container mt-30 lg:mt-40">
          <p className="text-center text-24 font-bold md:text-32">YOU MAY ALSO LIKE</p>
          <div className="mt-10 md:flex md:gap-3 lg:mt-16 lg:gap-7.5">
            {product.similarProducts.map((similarProduct, index) => {
              return (
                <div key={index} className="mt-14 first:mt-0 md:mt-0">
                  <img src={require(`@/assets/shared/mobile/image-${similarProduct.slug}.jpg`)} className="md:hidden" />
                  <img src={require(`@/assets/shared/tablet/image-${similarProduct.slug}.jpg`)} className="hidden md:block md:rounded-8 lg:hidden" />
                  <img src={require(`@/assets/shared/desktop/image-${similarProduct.slug}.jpg`)} className="hidden lg:block md:rounded-8" />
                  <p className="mt-8 text-center text-24 font-bold uppercase">{similarProduct.name}</p>
                  <div className="mt-8 text-center">
                    <Link 
                      to={`/products/${similarProduct.slug}`}
                      className="px-7.5 py-3.5 bg-orange-200 text-14 tracking-wider font-bold text-white"
                    >
                      SEE PRODUCT
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
        {/*
        <section className="container mx-auto md:flex">
          {categories.map((category, index) => {
            return (
              <div key={index}>
                <img src={require(`@/assets/shared/desktop/image-category-thumbnail-${category.name.toLowerCase()}.png`)} />
                <p>{category.name}</p>
                <Link to={category.url}>SHOP</Link>
              </div>
            )
          })}
        </section>
        <section className="container mx-auto lg:flex lg:flex-row-reverse">
          <div>
            <img src={require(`@/assets/shared/mobile/image-best-gear.jpg`)} className="md:hidden" />
            <img src={require(`@/assets/shared/tablet/image-best-gear.jpg`)} className="hidden md:block lg:hidden" />
            <img src={require(`@/assets/shared/desktop/image-best-gear.jpg`)} className="hidden lg:block" />
          </div>
          <div>
            <p>Bringing you the best audio gear</p>
            <p>Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
          </div>
        </section>
        */}
      </main>
      {/*
      <footer className="bg-black">
        <div className="container mx-auto lg:flex lg:justify-between">
          <img src={logo} />
          <ul className="md:flex">
            {menuItems.map((category, index) => (
              <li key={index}>
                <Link 
                  to={`/categories/${category.name.toLowerCase()}`}
                  className="text-white"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="container mx-auto md:flex md:flex-wrap md:justify-between lg:items-end">
          <p className="w-full text-white lg:order-1 lg:w-1/2">Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.</p>
          <p className="text-white lg:order-3 lg:w-full">Copyright {year}. All Rights Reserved</p>
          <div className="flex justify-center lg:order-2 lg:w-1/2 lg:justify-end">
            <img src={facebookIcon} className="w-6 h-6" />
            <img src={twitterIcon} className="w-6 h-6" />
            <img src={instagramIcon} className="w-6 h-6" />
          </div>
        </div>
      </footer>
      */}
    </>
  )
}

export default Product