/* global sessionStorage localStorage */

export default {
  isLogged: () => (sessionStorage.hasOwnProperty('token') || localStorage.hasOwnProperty('token')),

  isAdmin: () => {
    let roles = sessionStorage.getItem('roles') || localStorage.getItem('roles')

    if (roles) {
      return roles.split(',').includes('admin')
    }
    return false
  },
  getUsername: () => (sessionStorage.getItem('username') || localStorage.getItem('username')),
  getCartId: () => (sessionStorage.getItem('cartId') || localStorage.getItem('cartId')),
  getToken: () => (sessionStorage.getItem('token') || localStorage.getItem('token'))
}
