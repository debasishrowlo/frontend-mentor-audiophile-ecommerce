import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
      <p>Hello world!</p>
      <Link to="/products/yx1-earphones">Product page</Link>
    </div>
  )
}

export default Home