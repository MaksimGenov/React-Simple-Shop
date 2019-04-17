/* global FormData */
import fetcher from '../utils/fetcher'
const collection = 'brands'

export default {
  getAll () {
    const endpoint = 'all'
    return fetcher.get(collection, endpoint)
  },
  getById (id) {
    return fetcher.get(collection, id)
  },
  findByOffset (query) {
    const endpoint = 'page/' + query
    return fetcher.get(collection, endpoint)
  },
  getCount () {
    const endpoint = 'count'
    return fetcher.get(collection, endpoint)
  },
  create (name, description, image) {
    let data = new FormData()
    data.append('name', name)
    data.append('description', description)
    data.append('image', image)

    const endpoint = 'create'
    return fetcher.post(collection, endpoint, data)
  },
  delete: id => {
    const endpoint = `delete/${id}`
    return fetcher.post(collection, endpoint)
  }
}
