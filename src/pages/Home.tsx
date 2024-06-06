import { Link } from "react-router-dom"

import BestGear from "@/components/BestGear"
import Categories from "@/components/Categories"

import patternCircles from "@/assets/home/desktop/pattern-circles.svg"
import speaker1Image from "@/assets/home/mobile/image-speaker-zx9.png"
import speaker2MobileImage from "@/assets/home/mobile/image-speaker-zx7.jpg"
import speaker2TabletImage from "@/assets/home/tablet/image-speaker-zx7.jpg"
import speaker2DesktopImage from "@/assets/home/desktop/image-speaker-zx7.jpg"
import earphoneMobileImage from "@/assets/home/mobile/image-earphones-yx1.jpg"
import earphoneTabletImage from "@/assets/home/tablet/image-earphones-yx1.jpg"
import earphoneDesktopImage from "@/assets/home/desktop/image-earphones-yx1.jpg"

import data from "@/data.json"

const Home = () => {
  const heroProduct = data.find(product => {
    return product.slug === "xx99-mark-two-headphones"
  })

  return (
    <>
      <div className="relative z-20 bg-[#191919]">
        <img src={require(`@/assets/home/mobile/image-header.jpg`)} className="md:hidden" />
        <img src={require(`@/assets/home/tablet/image-header.jpg`)} className="hidden md:block lg:hidden" />
        <div className="container mx-auto py-16">
          <img src={require(`@/assets/home/desktop/image-hero.jpg`)} className="hidden lg:block" />
        </div>
        <div className="container absolute top-0 left-0 w-full h-full flex justify-center items-center lg:justify-start lg:left-1/2 lg:-translate-x-1/2">
          <div className="lg:w-2/5">
            {heroProduct.new && (
              <p className="text-center text-14 text-white/50 tracking-[10px] uppercase lg:text-left">New Product</p>
            )}
            <p className={`
              mt-4 text-center text-36 font-bold leading-10 tracking-[1.3px] uppercase text-white
              md:w-1/2 md:mx-auto md:text-56 md:leading-[58px] md:tracking-[2px]
              lg:w-full lg:mt-6 lg:text-left
            `}>
              {heroProduct.name}
            </p>
            <p className="mt-6 px-6 text-center leading-7 text-white/75 md:w-3/5 md:px-12 md:mx-auto lg:w-full lg:mx-0 lg:px-0 lg:pr-14 lg:text-left">
              Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
            </p>
            <div className="mt-7 text-center md:mt-10 lg:text-left">
              <Link 
                to={`/products/${heroProduct.slug}`}
                className="px-7.5 py-3.5 inline-block bg-orange-200 text-14 tracking-[1px] font-bold text-white uppercase"
              >
                See Product
              </Link>
            </div>
          </div>
        </div>
      </div>
      <section className="custom-container mt-30 lg:mt-40">
        <Categories />
      </section>
      <section className="custom-container mt-30 md:mt-24 lg:mt-40">
        <div className="py-14 bg-orange-200 rounded-8 lg:py-0 lg:flex lg:overflow-hidden">
          <div className="relative lg:w-1/2 lg:mt-24">
            <img src={patternCircles} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full scale-[1.7] md:scale-[1.3] lg:top-2/3 lg:scale-[1.5]" />
            <img src={speaker1Image} className="relative z-1 mx-auto w-44 md:w-48 lg:w-3/5 lg:translate-y-4" />
          </div>
          <div className="relative z-1 mt-8 lg:w-1/2 lg:mt-0 lg:flex lg:flex-col lg:justify-center">
            <p className="text-center text-36 leading-10 tracking-[1.2] font-bold text-white uppercase md:text-56 md:leading-[58px] md:tracking-[2px] lg:text-left">
              ZX9 <br /> SPEAKER
            </p>
            <p className="mt-6 text-center text-white/75 leading-[25px] md:mx-auto md:w-1/2 lg:w-2/3 lg:mx-0 lg:text-left">Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.</p>
            <div className="mt-6 text-center md:mt-10 lg:text-left">
              <Link 
                to="/products/zx9-speaker" 
                className="mx-auto px-7.5 py-3.5 inline-block bg-black hover:bg-[#4C4C4C] text-14 tracking-[1px] font-bold text-white uppercase transition duration-300"
              >
                See Product
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-6 md:mt-8 lg:mt-12 relative">
          <img src={speaker2MobileImage} className="md:hidden rounded-8" />
          <img src={speaker2TabletImage} className="hidden md:block lg:hidden rounded-8 " />
          <img src={speaker2DesktopImage} className="hidden lg:block rounded-8" />
          <div className="absolute top-1/2 left-6 -translate-y-1/2 md:left-16 lg:left-24">
            <p className="text-28 font-bold tracking-[2px] uppercase">zx7 Speaker</p>
            <Link 
              to="/products/zx9-speaker" 
              className="mx-auto mt-8 px-7.5 py-3.5 inline-block border border-black hover:bg-black text-14 tracking-[1px] font-bold hover:text-white uppercase transition duration-300"
            >
              See Product
            </Link>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:gap-3 lg:gap-7.5">
          <div className="rounded-8 overflow-hidden md:w-1/2">
            <img src={earphoneMobileImage} className="w-full object-cover md:hidden" />
            <img src={earphoneTabletImage} className="hidden w-full object-cover md:block lg:hidden" />
            <img src={earphoneDesktopImage} className="hidden w-full object-cover lg:block" />
          </div>
          <div className="px-6 py-10 bg-gray-200 rounded-8 md:w-1/2 md:px-10 md:flex md:flex-col md:justify-center lg:px-24">
            <p className="text-28 font-bold tracking-[2px] uppercase">yx1 earphones</p>
            <div>
              <Link
                to="/products/yx1-earphones" 
                className="mt-8 px-7.5 py-3.5 inline-block border border-black hover:bg-black text-14 tracking-[1px] font-bold hover:text-white uppercase transition duration-300"
              >
                See Product
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="custom-container my-30">
        <BestGear />
      </section>
      <div>
        <p>Products</p>
        <div className="mt-2">
          {data.map((product, index) => (
            <div key={index}>
              <Link to={`/products/${product.slug}`}>{product.name}</Link>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4" style={{ height: "1000px" }}>
        <Link to="/checkout">Checkout</Link>
      </div>
    </>
  )
}

export default Home