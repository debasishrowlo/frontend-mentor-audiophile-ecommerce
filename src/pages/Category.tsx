import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import BestGear from "@/components/BestGear"
import Categories from "@/components/Categories"

import data from "@/data.json" 

const Category = () => {
  const params = useParams()

  const category = params.category
  const products = data
    .filter(product => product.category === category)
    .map(product => ({
      new: product.new,
      slug: product.slug,
      name: product.name,
      description: product.description,
    }))

  // TODO: redirect to 404 page if no products found

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [params.category])

  return (
    <>
      <div className="bg-black">
        <div className="custom-container h-24 flex items-center justify-center border-t border-white/10 text-28 font-bold tracking-[2px] text-white uppercase md:h-60 md:text-40">
          {category}
        </div>
      </div>
      <section className="custom-container mt-16 md:mt-30 lg:mt-40">
        {products.map(product => (
          <div
            className="mt-30 first:mt-0 lg:mt-40 lg:flex lg:gap-30 lg:even:flex-row-reverse lg:items-center"
            key={product.slug}
          >
            <div className="rounded-8 overflow-hidden">
              <img src={require(`@/assets/product-${product.slug}/mobile/image-category-page-preview.jpg`)} className="md:hidden" />
              <img src={require(`@/assets/product-${product.slug}/tablet/image-category-page-preview.jpg`)} className="hidden md:block lg:hidden" />
              <img src={require(`@/assets/product-${product.slug}/desktop/image-category-page-preview.jpg`)} className="hidden lg:block" />
            </div>
            <div className="mt-8 md:mt-13">
              {product.new && (
                <p className="text-center text-14 tracking-[10px] text-orange-200 uppercase lg:text-left">New Product</p>
              )}
              <p className="w-3/4 mt-6 mx-auto md:mt-4 text-center text-28 font-bold tracking-[1px] uppercase md:w-1/2 md:text-40 md:leading-[44px] md:tracking-[1.4px] lg:ml-0 lg:text-left">
                {product.name}
              </p>
              <p className="mt-6 text-center leading-6 text-black/50 md:mt-8 lg:text-left">{product.description}</p>
              <div className="mt-6 text-center lg:mt-10 lg:text-left">
                <Link to={`/products/${product.slug}`} className="btn">See Product</Link>
              </div>
            </div>
          </div>
        ))}
      </section>
      <section className="custom-container mt-30 lg:mt-40">
        <Categories />
      </section>
      <section className="custom-container my-30">
        <BestGear />
      </section>
    </>
  )
}

export default Category