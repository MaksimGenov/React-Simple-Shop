import React from 'react'
import { Redirect } from 'react-router-dom'
import userServices from '../../../services/userServices'

const Logout = () => {
  userServices.logout()
  return <Redirect to='/' />
}

export default Logout
