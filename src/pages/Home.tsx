import { Link } from "react-router-dom"

import data from "@/data.json"

const Home = () => {
  return (
    <div>
      <p>Products</p>
      {data.map(product => {
        return (
          <div>
            <Link to={`/products/${product.slug}`}>{product.name}</Link>
          </div>
        )
      })}
    </div>
  )
}

export default Home