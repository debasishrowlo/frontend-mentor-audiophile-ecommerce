import { useNavigate } from "react-router-dom"

import Header from "@/components/Header"
import Footer from "@/components/Footer"

const Field = ({
  label,
  input,
} : {
  label: string,
  input: React.InputHTMLAttributes<HTMLInputElement>,
}) => {
  return (
    <div>
      <p className="text-12 font-bold">{label}</p>
      <input 
        className="w-full mt-2 px-6 py-4 border border-gray-300 rounded-8 outline-orange-100 placeholder:font-bold placeholder:text-black placeholder:opacity-50"
        {...input}
      />
    </div>
  )
}

const Checkout = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <main className="bg-gray-200 pt-4">
        <div className="container mx-auto px-6">
          <button onClick={() => navigate(-1)} className="font-medium opacity-50 md:font-normal">
            Go Back
          </button>
          <div className="mt-6 pb-24 md:pb-28 lg:mt-10 lg:pb-36 lg:flex">
            <div className="p-6 bg-white rounded-8 md:px-7 md:py-7.5 lg:px-12 lg:py-14 lg:w-3/4">
              <h1 className="text-28 font-bold md:text-32">CHECKOUT</h1>
              <div className="mt-8 md:mt-10">
                <h2 className="tracking-wider font-bold text-orange-200">BILLING DETAILS</h2>
                <div className="mt-4">
                  <div className="md:flex md:gap-4">
                    <div className="md:w-1/2">
                      <Field
                        label="Name"
                        input={{
                          type: "text",
                          placeholder: "Alexei Ward",
                        }}
                      />
                    </div>
                    <div className="mt-6 md:w-1/2 md:mt-0">
                      <Field
                        label="Email Address"
                        input={{
                          type: "email",
                          placeholder: "alexeiward@mail.com",
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-6 md:w-1/2 md:pr-2">
                    <Field
                      label="Phone Number"
                      input={{
                        type: "tel",
                        placeholder: "+1 202-555-0136",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8 md:mt-14">
                <h2 className="tracking-wider font-bold text-orange-200">SHIPPING INFO</h2>
                <div className="mt-4">
                  <Field
                    label="Your Address"
                    input={{
                      type: "text",
                      placeholder: "1137 Williams Avenue",
                    }}
                  />
                </div>
                <div className="mt-6 md:flex md:gap-4">
                  <div className="md:w-1/2">
                    <Field
                      label="ZIP Code"
                      input={{
                        type: "number",
                        placeholder: "10001",
                      }}
                    />
                  </div>
                  <div className="mt-6 md:w-1/2 md:mt-0">
                    <Field
                      label="City"
                      input={{
                        type: "text",
                        placeholder: "New York",
                      }}
                    />
                  </div>
                </div>
                <div className="mt-6 md:w-1/2 md:pr-2">
                  <Field
                    label="Country"
                    input={{
                      type: "text",
                      placeholder: "United States",
                    }}
                  />
                </div>
              </div>
              {/* <div>Payment Details</div> */}
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