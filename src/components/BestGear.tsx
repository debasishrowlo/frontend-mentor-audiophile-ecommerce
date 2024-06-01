const BestGear = () => {
  return (
    <div className="lg:flex lg:items-center lg:flex-row-reverse">
      <div className="lg:w-1/2">
        <img src={require(`@/assets/shared/mobile/image-best-gear.jpg`)} className="rounded-8 md:hidden" />
        <img src={require(`@/assets/shared/tablet/image-best-gear.jpg`)} className="hidden rounded-8 md:block lg:hidden" />
        <img src={require(`@/assets/shared/desktop/image-best-gear.jpg`)} className="w-full hidden rounded-8 lg:block" />
      </div>
      <div className="mt-10 md:mt-16 lg:w-1/2">
        <p className="text-center leading-10 text-28 font-bold md:text-40 lg:text-left">
          <span>BRINGING YOU THE <span className="text-orange-200">BEST</span></span>
          <br className="hidden md:block lg:hidden" />
          <span className="ml-1">AUDIO GEAR</span>
        </p>
        <p className="mt-8 text-center font-medium opacity-50 md:px-10 lg:px-0 lg:pr-16 lg:text-left">
          Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.
        </p>
      </div>
    </div>
  )
}

export default BestGear