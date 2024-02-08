import { Link } from "react-router-dom"

import data from "@/data.json"

const Home = () => {
  return (
    <div>
      <div>
        <p>Products</p>
        <div className="mt-2">
          {data.map((product, index) => {
            return (
              <div key={index}>
                <Link to={`/products/${product.slug}`}>{product.name}</Link>
              </div>
            )
          })}
        </div>
      </div>
      <div className="mt-4">
        <Link to="/checkout">Checkout</Link>
      </div>
    </div>
  )
}

export default Home