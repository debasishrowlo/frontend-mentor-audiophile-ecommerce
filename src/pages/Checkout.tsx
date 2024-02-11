import { useContext, useState } from "react"
import classnames from "classnames"
import { useNavigate } from "react-router-dom"

import { formatCurrency } from "@/common/utils"
import CartContext from "@/contexts/CartContext"

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

const enum paymentMethods {
  eMoney = "eMoney",
  cashOnDelivery = "cashOnDelivery",
}

const Checkout = () => {
  const navigate = useNavigate()
  const { cart } = useContext(CartContext)

  const [paymentMethod, setPaymentMethod] = useState<paymentMethods>(paymentMethods.eMoney)

  return (
    <>
      <Header />
      <main className="bg-gray-200 pt-4">
        <div className="container mx-auto px-6">
          <button onClick={() => navigate(-1)} className="font-medium opacity-50 md:font-normal">
            Go Back
          </button>
          <div className="mt-6 pb-24 md:pb-28 lg:mt-10 lg:pb-36 lg:flex lg:gap-7.5">
            <div className="p-6 bg-white rounded-8 md:px-7 md:py-7.5 lg:px-12 lg:py-14 lg:w-2/3">
              <h1 className="text-28 tracking-[1px] font-bold md:text-32">CHECKOUT</h1>
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
              <div className="mt-8 md:mt-16">
                <h2 className="tracking-wider font-bold text-orange-200">PAYMENT DETAILS</h2>
                <div className="mt-4 md:flex md:gap-4">
                  <p className="text-12 font-bold md:w-1/2">Payment Method</p>
                  <div className="mt-4 md:w-1/2">
                    {[
                      {
                        name: "e-Money",
                        value: paymentMethods.eMoney,
                      },
                      {
                        name: "Cash on Delivery",
                        value: paymentMethods.cashOnDelivery,
                      },
                    ].map((method, index) => {
                      const checked = paymentMethod === method.value

                      return (
                        <label 
                          className={classnames("mt-4 first:mt-0 px-4 py-4.5 border flex items-center rounded-8", {
                            "border-gray-300": !checked,
                            "border-orange-100": checked,
                          })} 
                          key={index}
                        >
                          <input
                            type="radio" 
                            name="payment-method" 
                            value={method.value} 
                            checked={checked}
                            onChange={() => setPaymentMethod(method.value)}
                            className="hidden"
                          />
                          <div className="w-5 h-5 relative border border-gray-300 rounded-full">
                            {checked && (
                              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-orange-200 rounded-full"></div>
                            )}
                          </div>
                          <p className="ml-4">{method.name}</p>
                        </label>
                      )
                    })}
                  </div>
                </div>
                <div className="mt-8 md:mt-6 md:flex md:gap-4">
                  <div className="md:w-1/2">
                    <Field
                      label="e-Money Number"
                      input={{
                        type: "number",
                        placeholder: "238521993",
                      }}
                    />
                  </div>
                  <div className="mt-6 md:w-1/2 md:mt-0">
                    <Field
                      label="e-Money PIN"
                      input={{
                        type: "number",
                        placeholder: "6891",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3">
              <div className="mt-8 px-6 py-8 bg-white rounded-8 md:p-8 lg:mt-0">
                <h1 className="text-18 tracking-[1.2px] font-bold">SUMMARY</h1>
                <div className="mt-8">
                  {(cart.products.length > 0) ? (
                    <>
                      {cart.products.map((product, index) => (
                        <div key={index} className="mt-6 first:mt-0 flex items-center">
                          <div className="shrink-0">
                            <img 
                              src={require(`@/assets/product-${product.slug}/mobile/image-product.jpg`)} 
                              className="w-16 rounded-8"
                            />
                          </div>
                          <div className="pl-6 flex grow justify-between">
                            <div>
                              <p className="font-bold">{product.name}</p>
                              <p className="font-bold opacity-50 lg:text-14">{formatCurrency(product.price)}</p>
                            </div>
                            <p className="font-bold opacity-50">x{product.quantity}</p>
                          </div>
                        </div>
                      ))}
                      <div className="mt-8">
                        <div className="flex justify-between">
                          <p className="opacity-50">TOTAL</p>
                          <p className="text-18 font-bold">{formatCurrency(cart.total)}</p>
                        </div>
                        <div className="mt-2 flex justify-between">
                          <p className="opacity-50">SHIPPING</p>
                          <p className="text-18 font-bold">{formatCurrency(cart.shipping)}</p>
                        </div>
                        <div className="mt-2 flex justify-between">
                          <p className="opacity-50">VAT (INCLUDED)</p>
                          <p className="text-18 font-bold">{formatCurrency(cart.vat)}</p>
                        </div>
                        <div className="mt-6 flex justify-between">
                          <p className="opacity-50">GRAND TOTAL</p>
                          <p className="text-18 font-bold text-orange-200">{formatCurrency(cart.grandTotal)}</p>
                        </div>
                        <button type="button" className="w-full mt-8 py-4 bg-orange-200 text-14 font-bold tracking-[1px] text-white">
                          CONTINUE & PAY
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className="font-bold tracking-wider opacity-50">No Items Available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Checkout