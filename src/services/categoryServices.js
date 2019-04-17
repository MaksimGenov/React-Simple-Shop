/* global FormData */
import fetcher from '../utils/fetcher'
const collection = 'categories'

export default {
  getAll () {
    const endpoint = 'all'
    return fetcher.get(collection, endpoint)
  },
  getById (id) {
    return fetcher.get(collection, id)
  },
  getCount () {
    const endpoint = 'count'
    return fetcher.get(collection, endpoint)
  },
  create (name) {
    let data = new FormData()
    data.append('name', name)

    const endpoint = 'create'
    return fetcher.post(collection, endpoint, data)
  }
}
