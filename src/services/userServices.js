/* global FormData sessionStorage localStorage */
import fetcher from '../utils/fetcher'
const collection = 'users'

export default {
  login: (username, password, remember) => {
    const endpoint = 'login'
    let data = new FormData()
    data.append('username', username)
    data.append('password', password)
    return fetcher.post(collection, endpoint, data)
  },
  register: (username, password, repeatPassword) => {
    const endpoint = 'register'
    let data = new FormData()
    data.append('username', username)
    data.append('password', password)
    data.append('repeatPassword', repeatPassword)
    return fetcher.post(collection, endpoint, data)
  },
  logout: () => {
    sessionStorage.clear()
    localStorage.clear()
  },
  update (id) {
    const endpoint = 'update/' + id
    fetcher.post(collection, endpoint)
      .then(user => console.log(user))
  },
  signIn: (userData, remember) => {
    if (remember) {
      Object.keys(userData).forEach(key => localStorage.setItem(key, userData[key]))
    } else {
      Object.keys(userData).forEach(key => sessionStorage.setItem(key, userData[key]))
    }
    window.history.back()
  }
}
