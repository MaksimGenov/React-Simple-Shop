import React from 'react'
import { Route } from 'react-router-dom'
import auth from '../../utils/Auth'

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    auth.isLogged()
      ? <Component {...props} />
      : <h1>Unauthorized</h1>
  )
  } />
)

export default PrivateRoute
