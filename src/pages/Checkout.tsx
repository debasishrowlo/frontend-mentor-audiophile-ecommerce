import React, { useContext, useState } from "react"
import classnames from "classnames"
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as yup from "yup"
import { Dialog, DialogPanel } from "@headlessui/react"

import { formatCurrency } from "@/common/utils"
import CartContext, { Cart } from "@/contexts/CartContext"

import CheckIcon from "@/assets/checkout/icon-order-confirmation.svg"

const requiredErrorMessage = "required"

const Field = ({
  label,
  input,
  touched,
  error = "",
  onChange = () => {},
} : {
  label: string,
  input: React.InputHTMLAttributes<HTMLInputElement>,
  touched: boolean,
  error: string,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
}) => {
  const hasError = touched && error
  const errorMessage = error === requiredErrorMessage ? "" : error

  return (
    <div>
      <div className="flex justify-between">
        <p className={classnames("text-12 font-bold", {
          "text-red-100": hasError,
        })}>
          {label}
        </p>
        {hasError && (
          <p className="text-12 font-medium text-red-100">{errorMessage}</p>
        )}
      </div>
      <div className={classnames("mt-2 border-transparent", {
        "border": !hasError,
        "border-0": hasError,
      })}>
        <input
          className={classnames("w-full px-6 py-4 border rounded-8 placeholder:font-bold placeholder:text-black placeholder:opacity-50", {
            "border border-gray-300": !hasError,
            "border-2 border-red-100 outline-none": hasError,
          })}
          {...input}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

const enum paymentMethods {
  eMoney = "eMoney",
  cashOnDelivery = "cashOnDelivery",
}

const ThankYouDialog = ({
  cart
} : {
  cart: Cart,
}) => {
  const [allItemsVisible, setAllItemsVisible] = useState(false)

  const products = allItemsVisible ? cart.products : cart.products.slice(0, 1)

  return (
    <>
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 p-6 w-screen flex items-center justify-center">
        <DialogPanel as={React.Fragment}>
          <div className="p-8 md:p-12 bg-white w-full max-w-[540px] max-h-full rounded-8 overflow-y-auto">
            <img src={CheckIcon} />
            <p className="mt-6 text-24 leading-7 font-bold md:mt-8 md:text-32 md:leading-9">THANK YOU <br/> FOR YOUR ORDER</p>
            <p className="mt-4 text-14 leading-6 font-medium text-black/50 md:mt-6">You will receive an email confirmation shortly.</p>
            <div className="mt-6 rounded-8 overflow-hidden md:mt-8 md:flex">
              <div className="p-6 bg-gray-200 md:w-1/2">
                {products.map(product => (
                  <div className="mt-4 flex items-center first:mt-0">
                    <img
                      src={require(`@/assets/product-${product.slug}/mobile/image-product.jpg`)}
                      className="w-12 rounded-8"
                    />
                    <div className="ml-4 flex grow justify-between items-start">
                      <div>
                        <p className="text-14 font-bold">{product.name}</p>
                        <p className="text-14 font-bold text-black/50">{formatCurrency(product.price)}</p>
                      </div>
                      <p className="text-14 font-bold text-black/50">x{product.quantity}</p>
                    </div>
                  </div>
                ))}
                <div className="mt-3 border-t border-black/10">
                  <button 
                    type="button" 
                    onClick={() => setAllItemsVisible(!allItemsVisible)} 
                    className="mt-3 w-full text-12 font-bold text-black/50"
                  >
                    {allItemsVisible ? (
                      "View less"
                    ) : (
                      `and ${cart.products.length - 1} other item(s)`
                    )}
                  </button>
                </div>
              </div>
              <div className={classnames("p-6 flex bg-black md:w-1/2", {
                "items-center": !allItemsVisible,
                "items-end": allItemsVisible,
              })}>
                <div>
                  <p className="text-14 text-white/50">GRAND TOTAL</p>
                  <p className="mt-3 text-18 font-bold text-white">{formatCurrency(cart.grandTotal)}</p>
                </div>
              </div>
            </div>
            <div>
              <Link 
                to="/" 
                className="block w-full mt-6 py-4 bg-orange-200 hover:bg-orange-100 text-14 font-bold text-center text-white transition md:mt-12"
              >
                BACK TO HOME
              </Link>
            </div>
          </div>
        </DialogPanel>
      </div>
    </>
  )
}

const Checkout = () => {
  const navigate = useNavigate()
  const { cart } = useContext(CartContext)

  const [thankYouDialogVisible, setThankYouDialogVisible] = useState(false)

  const form = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      zip: "",
      city: "",
      country: "",
      eMoneyNumber: "",
      paymentMethod: paymentMethods.eMoney,
      eMoneyPin: "",
    },
    validationSchema: yup.object({
      name: yup.string().required(requiredErrorMessage),
      email: yup.string().email().required(requiredErrorMessage),
      phoneNumber: yup.string().required(requiredErrorMessage),
      address: yup.string().required(requiredErrorMessage),
      zip: yup.string().required(requiredErrorMessage),
      city: yup.string().required(requiredErrorMessage),
      country: yup.string().required(requiredErrorMessage),
      eMoneyNumber: yup.string().required(requiredErrorMessage),
      eMoneyPin: yup.string().required(requiredErrorMessage),
    }),
    onSubmit: () => {
      setThankYouDialogVisible(true)
    },
  })

  return (
    <>
      <main className="bg-gray-200 pt-4">
        <form onSubmit={form.handleSubmit}>
          <div className="container mx-auto px-6">
            <button type="button" onClick={() => navigate(-1)} className="font-medium opacity-50 md:font-normal">
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
                            name: "name",
                            type: "text",
                            placeholder: "Alexei Ward",
                            value: form.values.name,
                          }}
                          touched={form.touched.name}
                          error={form.errors.name}
                          onChange={form.handleChange}
                        />
                      </div>
                      <div className="mt-6 md:w-1/2 md:mt-0">
                        <Field
                          label="Email Address"
                          input={{
                            name: "email",
                            type: "email",
                            placeholder: "alexeiward@mail.com",
                            value: form.values.email,
                          }}
                          touched={form.touched.email}
                          error={form.errors.email}
                          onChange={form.handleChange}
                        />
                      </div>
                    </div>
                    <div className="mt-6 md:w-1/2 md:pr-2">
                      <Field
                        label="Phone Number"
                        input={{
                          name: "phoneNumber",
                          type: "tel",
                          placeholder: "+1 202-555-0136",
                          value: form.values.phoneNumber,
                        }}
                        touched={form.touched.phoneNumber}
                        error={form.errors.phoneNumber}
                        onChange={form.handleChange}
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
                        name: "address",
                        type: "text",
                        placeholder: "1137 Williams Avenue",
                        value: form.values.address,
                      }}
                      touched={form.touched.address}
                      error={form.errors.address}
                      onChange={form.handleChange}
                    />
                  </div>
                  <div className="mt-6 md:flex md:gap-4">
                    <div className="md:w-1/2">
                      <Field
                        label="ZIP Code"
                        input={{
                          name: "zip",
                          type: "number",
                          placeholder: "10001",
                          value: form.values.zip,
                        }}
                        touched={form.touched.zip}
                        error={form.errors.zip}
                        onChange={form.handleChange}
                      />
                    </div>
                    <div className="mt-6 md:w-1/2 md:mt-0">
                      <Field
                        label="City"
                        input={{
                          name: "city",
                          type: "text",
                          placeholder: "New York",
                          value: form.values.city,
                        }}
                        touched={form.touched.city}
                        error={form.errors.city}
                        onChange={form.handleChange}
                      />
                    </div>
                  </div>
                  <div className="mt-6 md:w-1/2 md:pr-2">
                    <Field
                      label="Country"
                      input={{
                        name: "country",
                        type: "text",
                        placeholder: "United States",
                        value: form.values.country,
                      }}
                      touched={form.touched.country}
                      error={form.errors.country}
                      onChange={form.handleChange}
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
                        const checked = form.values.paymentMethod === method.value

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
                              name="paymentMethod" 
                              value={method.value} 
                              checked={checked}
                              onChange={form.handleChange}
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
                          name: "eMoneyNumber",
                          type: "number",
                          placeholder: "238521993",
                          value: form.values.eMoneyNumber,
                        }}
                        touched={form.touched.eMoneyNumber}
                        error={form.errors.eMoneyNumber}
                        onChange={form.handleChange}
                      />
                    </div>
                    <div className="mt-6 md:w-1/2 md:mt-0">
                      <Field
                        label="e-Money PIN"
                        input={{
                          name: "eMoneyPin",
                          type: "number",
                          placeholder: "6891",
                          value: form.values.eMoneyPin,
                        }}
                        touched={form.touched.eMoneyPin}
                        error={form.errors.eMoneyPin}
                        onChange={form.handleChange}
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
                          <button type="submit" className="w-full mt-8 py-4 bg-orange-200 text-14 font-bold tracking-[1px] text-white">
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
        </form>
      </main>
      <Dialog
        open={thankYouDialogVisible}
        onClose={() => setThankYouDialogVisible(false)}
        className="relative z-50"
      >
        <ThankYouDialog cart={cart} />
      </Dialog>
    </>
  )
}

export default Checkout