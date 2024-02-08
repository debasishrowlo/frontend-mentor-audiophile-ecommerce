import { Link } from "react-router-dom"

import logo from "@/assets/shared/desktop/logo.svg"
import facebookIcon from "@/assets/shared/desktop/icon-facebook.svg"
import twitterIcon from "@/assets/shared/desktop/icon-twitter.svg"
import instagramIcon from "@/assets/shared/desktop/icon-instagram.svg"

import menuItems from "@/common/menuItems"

const Footer = () => {
  const year = (new Date()).getFullYear()

  return (
    <footer className="bg-black">
      <div className="product-page__container">
        <div className="mx-auto w-28 h-1 bg-orange-200 md:mx-0"></div>
        <div className="lg:mt-16 lg:flex lg:justify-between lg:items-center">
          <img src={logo} className="mx-auto mt-12 md:mx-0 md:mt-14 lg:mt-0" />
          <ul className="mt-12 md:flex md:mt-8 lg:mt-0">
            {menuItems.map((category, index) => (
              <li key={index} className="mt-4 first:mt-0 text-center md:ml-8 md:first:ml-0 md:mt-0">
                <Link 
                  to={`/categories/${category.name.toLowerCase()}`}
                  className="text-14 tracking-[2px] font-bold text-white uppercase"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-12 md:flex md:flex-wrap md:justify-between lg:items-end lg:mt-9">
          <p className="w-full text-center leading-7 text-white opacity-50 md:text-left lg:order-1 lg:w-1/2">Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.</p>
          <p className="mt-12 text-center font-bold text-white opacity-50 lg:order-3 lg:w-full lg:pb-12 lg:text-left">
            Copyright {year}. All Rights Reserved
          </p>
          <div className="mt-12 pb-10 flex justify-center lg:order-2 lg:w-1/2 lg:pb-0 lg:justify-end">
            {[facebookIcon, twitterIcon, instagramIcon].map((icon, index) => (
              <img src={icon} className="w-6 ml-4 first:ml-0" key={index} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer