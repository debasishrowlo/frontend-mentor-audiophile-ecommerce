import { Link, useLocation } from "react-router-dom"
import classnames from "classnames"

import logo from "@/assets/shared/desktop/logo.svg"
import hamburgerIcon from "@/assets/shared/tablet/icon-hamburger.svg"
import cartIcon from "@/assets/shared/desktop/icon-cart.svg"

import menuItems from "@/common/menuItems"

const Content = () => {
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
      <Link to="/checkout">
        <img src={cartIcon} />
      </Link>
    </>
  )
}

const Header = () => {
  const location = useLocation()
  const onHomePage = location.pathname === "/"

  return (
    <>
      {onHomePage && (
        <div className="fixed z-30 top-0 left-0 w-full">
          <div className="container mx-auto px-6 py-8 flex items-center justify-between border-b border-white/10 md:px-10 lg:px-0">
            <Content />
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
          <Content />
        </div>
      </div>
    </>
  )
}

export default Header