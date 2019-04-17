/* global FormData */
import fetcher from '../utils/fetcher'
import auth from '../utils/Auth'
const collection = 'cart'

export default {
  get: () => {
    const cartId = auth.getCartId()
    return fetcher.get(collection, cartId)
  },
  update: products => {
    const cartId = auth.getCartId()
    const endpoint = `update/${cartId}`
    let data = new FormData()
    data.append('products', JSON.stringify(products))

    return fetcher.post(collection, endpoint, data)
  }
}
