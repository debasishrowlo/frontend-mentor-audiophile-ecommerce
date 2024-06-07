import React, { useContext, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import classnames from "classnames"
import { Dialog, DialogPanel } from "@headlessui/react"

import CartContext from "@/contexts/CartContext"
import { formatCurrency } from "@/common/utils"
import menuItems from "@/common/menuItems"

import logo from "@/assets/shared/desktop/logo.svg"
import hamburgerIcon from "@/assets/shared/tablet/icon-hamburger.svg"
import cartIcon from "@/assets/shared/desktop/icon-cart.svg"

const Content = ({ openMiniCart } : { openMiniCart: Function}) => {
  return (
    <>
      <button type="button" className="lg:hidden">
        <img src={hamburgerIcon} />
      </button>
      <Link to="/" className="ml-6 flex justify-center md:grow md:justify-start lg:grow-0 lg:ml-0">
        <img src={logo} />
      </Link>
      <div className="hidden space-x-8 lg:block">
        {menuItems.map((category, index) => (
          <Link
            to={category.url} 
            className="text-14 tracking-[2px] font-bold text-white hover:text-orange-200 uppercase transition"
            key={index}
          >
            {category.name}
          </Link>
        ))}
      </div>
      <button type="button" onClick={() => openMiniCart()}>
        <img src={cartIcon} />
      </button>
    </>
  )
}

const Header = () => {
  const location = useLocation()
  const onHomePage = location.pathname === "/"

  const {
    cart,
    updateQuantity, 
    removeProduct,
    removeAllProducts,
  } = useContext(CartContext)

  const [miniCartVisible, setMiniCartVisible] = useState(false)

  const openMiniCart = () => {
    setMiniCartVisible(true)
  }

  const increment = (index:number) => {
    updateQuantity(index, cart.products[index].quantity + 1)
  }

  const decrement = (index:number) => {
    const newQuantity = cart.products[index].quantity - 1

    if (newQuantity > 0) {
      updateQuantity(index, newQuantity)
    } else {
      removeProduct(index)
    }
  }

  const removeAll = () => {
    removeAllProducts()
  }

  return (
    <>
      {onHomePage && (
        <div className="fixed z-30 top-0 left-0 w-full">
          <div className="container mx-auto px-6 py-8 flex items-center justify-between border-b border-white/10 md:px-10 lg:px-0">
            <Content openMiniCart={openMiniCart} />
          </div>
        </div>
      )}
      <div className={classnames("z-10 top-0 left-0 w-full bg-black", {
        "fixed": onHomePage,
        "sticky": !onHomePage,
      })}>
        <div className={classnames("container mx-auto px-6 py-8 flex items-center justify-between md:px-10 lg:px-0", {
          "border-b border-white/10": !onHomePage,
        })}>
          <Content openMiniCart={openMiniCart} />
        </div>
      </div>
      {miniCartVisible && (
        <>
          <Dialog
            open={miniCartVisible}
            onClose={() => setMiniCartVisible(false)}
            className="relative z-50"
          >
            <div className="fixed inset-0 flex flex-col">
              <div className="h-[90px]"></div>
              <div className="relative grow">
                <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
                <div className="relative z-10 container mx-auto flex w-screen items-center justify-center p-6 md:px-10 md:justify-end lg:px-0 lg:py-8">
                  <DialogPanel as={React.Fragment}>
                    <div className="w-full max-w-[375px] px-7 py-8 bg-white rounded-8">
                      {cart.products.length > 0 ? (
                        <>
                          <div className="flex justify-between items-center">
                            <p className="text-18 font-bold tracking-[1.2px] uppercase">Cart ({cart.products.length})</p>
                            <button
                              type="button"
                              className="text-black/50 underline"
                              onClick={() => removeAll()}
                            >
                              Remove all
                            </button>
                          </div>
                          <div className="mt-8 flex flex-col gap-6">
                            {cart.products.map((product, index) => (
                              <div
                                className="flex justify-between items-center"
                                key={product.slug}
                              >
                                <div className="flex items-center">
                                  <img
                                    src={require(`@/assets/product-${product.slug}/mobile/image-product.jpg`)}
                                    className="w-16 h-16 rounded-8"
                                  />
                                  <div className="ml-4">
                                    <p className="text-[15px] font-bold leading-[25px]">{product.name}</p>
                                    <p className="text-14 font-bold text-black/50">{formatCurrency(product.price)}</p>
                                  </div>
                                </div>
                                <div className="flex items-center bg-gray-200">
                                  <button 
                                    type="button"
                                    className="px-4 py-2 text-14 font-bold tracking-[1px] text-black/25"
                                    onClick={() => decrement(index)}
                                  >
                                    -
                                  </button>
                                  <p className="min-w-[16px] text-center text-14 font-bold tracking-[1px] uppercase">{product.quantity}</p>
                                  <button
                                    type="button"
                                    className="px-4 py-2 text-14 font-bold tracking-[1px] text-black/25"
                                    onClick={() => increment(index)}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-8 flex justify-between items-center">
                            <p className="text-black/50">TOTAL</p>
                            <p className="text-18 font-bold uppercase">{formatCurrency(cart.grandTotal)}</p>
                          </div>
                          <Link
                            to="/checkout"
                            onClick={() => setMiniCartVisible(false)}
                            className="mt-6 w-full py-4 inline-block bg-orange-200 hover:bg-orange-100 text-center text-white transition duration-300"
                          >
                            CHECKOUT
                          </Link>
                        </>
                      ) : (
                        <p className="text-18 font-bold tracking-[1.2px] uppercase">Cart (0)</p>
                      )}
                    </div>
                  </DialogPanel>
                </div>
              </div>
            </div>
          </Dialog>
        </>
      )}
    </>
  )
}

export default Header