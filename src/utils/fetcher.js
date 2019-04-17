/* global fetch */
const DB_BASE_URL = 'http://localhost:5000/api'

const fetcher = {
  post: (collection, endpoint, data, headers) => {
    let url = DB_BASE_URL + `/${collection}/${endpoint}`
    return fetch(url, {
      method: 'POST',
      headers,
      body: data
    }).then(response => response.json())
  },
  get: (collection, endpoint, headers) => {
    let url = DB_BASE_URL + `/${collection}/${endpoint}`
    return fetch(url, {
      method: 'GET'
    }).then(response => response.json())
  }
}

export default fetcher
