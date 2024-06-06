import { Link } from "react-router-dom"

import rightArrowIcon from "@/assets/shared/desktop/icon-arrow-right.svg"

import categories from "@/common/categories"

const Categories = () => {
  return (
    <div className="md:flex md:gap-2.5 lg:gap-7.5">
      {categories.map((category, index) => {
        return (
          <div key={index} className="mt-16 pt-22 pb-6 relative bg-gray-200 rounded-8 md:w-1/3">
            <img 
              src={require(`@/assets/shared/desktop/image-category-thumbnail-${category.name.toLowerCase()}.png`)}
              className="w-32 mx-auto absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[35%] lg:w-44"
            />
            <p className="text-center tracking-[1px] font-bold uppercase lg:text-18">{category.name}</p>
            <div className="mt-4 text-center">
              <Link 
                to={category.url}
                className="inline-flex items-center tracking-[1px] font-bold text-14 opacity-50"
              >
                <span>SHOP</span>
                <span className="ml-3.5">
                  <img src={rightArrowIcon} />
                </span>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Categories