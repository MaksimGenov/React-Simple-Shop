import React from 'react'
import { Route } from 'react-router-dom'
import auth from '../../utils/Auth'

const AdminRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    auth.isAdmin()
      ? <Component {...props} />
      : <h1>Unauthorized</h1>
  )
  } />
)

export default AdminRoute
