/* global FormData */
import fetcher from '../utils/fetcher'
const collection = 'products'

export default {
  search: query => {
    const endpoint = `search${query}`
    return fetcher.get(collection, endpoint)
  },
  findById: id => {
    const endpoint = `details/${id}`
    return fetcher.get(collection, endpoint)
  },
  create: (brand, model, categories, description, price, images) => {
    let data = new FormData()
    data.append('brand', brand)
    data.append('model', model)
    data.append('categories', JSON.stringify(categories))
    data.append('description', description)
    data.append('price', price)
    for (const key in images) {
      data.append(key, images[key])
    }

    const endpoint = 'create'
    return fetcher.post(collection, endpoint, data)
  },
  findAll: () => {
    const endpoint = 'all'
    return fetcher.get(collection, endpoint)
  }
}
