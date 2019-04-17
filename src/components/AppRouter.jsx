import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import LoginForm from './froms/LoginForm'
import RegisterForm from './froms/RegisterForm'
import BrandsPage from './pages/brands/BrandsPage'
import ProductsPage from './pages/products/ProductsPage'
import ProductDetails from './pages/products/ProductDetails'
import CartPage from './pages/cart/CartPage'
import Logout from './pages/user/Logout'
import AdminPage from './pages/admin/AdminPage'
import CategoryPage from './pages/categories/CategoryPage'
import UserProfile from './pages/user/UserProfile'
import AdminRoute from './common/AdminRoute'
import PrivateRoute from './common/PrivateRoute'

const AppRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={LoginForm} />
        <Route path='/register' component={RegisterForm} />
        <Route path='/logout' component={Logout} />
        <Route path='/brands' component={BrandsPage} />
        <Route path='/categories' component={CategoryPage} />
        <Route path='/products/details/:id' component={ProductDetails} />
        <Route path='/products/all' component={ProductsPage} />
        <PrivateRoute path='/cart' component={CartPage} />
        <AdminRoute path='/admin' component={AdminPage} />
        <PrivateRoute path='/profile' component={UserProfile} />
      </Switch>
    </div>
  )
}
export default AppRouter
