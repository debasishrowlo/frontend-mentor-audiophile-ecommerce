import { useNavigate } from "react-router-dom"

import Header from "@/components/Header"
import Footer from "@/components/Footer"

const Checkout = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <main className="bg-gray-100 pt-4">
        <div className="container mx-auto px-6">
          <button onClick={() => navigate(-1)} className="font-medium opacity-50 md:font-normal">
            Go Back
          </button>
          <div className="lg:flex">
            <div className="lg:w-3/4">
              <div>Billing Details</div>
              <div>Shipping Info</div>
              <div>Payment Details</div>
            </div>
            <div className="lg:w-1/4">Cart summary</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Checkout