export const formatCurrency = (price:number) => {
  let formattedPrice = ""

  if (Number.isInteger(price)) {
    formattedPrice = price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    })
  } else {
    formattedPrice = price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  formattedPrice = formattedPrice.slice(0, 1) + " " + formattedPrice.slice(1)

  return formattedPrice
}