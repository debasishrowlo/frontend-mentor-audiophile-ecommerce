import { Link } from "react-router-dom"

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