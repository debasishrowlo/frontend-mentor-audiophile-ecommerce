export const formatCurrency = (price:number) => {
  let formattedPrice = price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  formattedPrice = formattedPrice.slice(0, 1) + " " + formattedPrice.slice(1)

  return formattedPrice
}