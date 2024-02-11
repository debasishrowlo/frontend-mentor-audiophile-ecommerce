import { Link } from "react-router-dom"

import logo from "@/assets/shared/desktop/logo.svg"
import hamburgerIcon from "@/assets/shared/tablet/icon-hamburger.svg"
import cartIcon from "@/assets/shared/desktop/icon-cart.svg"

import menuItems from "@/common/menuItems"

const Header = () => {
  return (
    <header className="sticky z-10 top-0 left-0 bg-black">
      <div className="container mx-auto px-6 py-8 flex items-center justify-between md:px-10 lg:px-0">
        <button type="button" className="lg:hidden">
          <img src={hamburgerIcon} />
        </button>
        <Link to="/" className="ml-6 flex justify-center md:grow md:justify-start lg:grow-0 lg:ml-0">
          <img src={logo} />
        </Link>
        <div className="hidden space-x-8 lg:block">
          {menuItems.map((category, index) => (
            <a 
              href="#" 
              className="text-14 tracking-[2px] font-bold text-white uppercase"
              key={index}
            >
              {category.name}
            </a>
          ))}
        </div>
        <Link to="/checkout">
          <img src={cartIcon} />
        </Link>
      </div>
    </header>
  )
}

export default Header