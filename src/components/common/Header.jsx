import React, { Component } from 'react'
import Clock from './Clock'
import auth from '../../utils/Auth'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'reactstrap'
import logo from '../../logo.png'

class Header extends Component {
  render () {
    return (
      <Navbar color='light'>
        <NavLink to='/'>
          <img src={logo} alt='Logo' className='col-xl-2' />
        </NavLink>
        <Nav>
          <NavItem><Clock /></NavItem>
        </Nav>
        <Nav pills>
          { auth.isLogged()
            ? <NavItem><NavLink to='/cart' className='nav-link'>Cart</NavLink></NavItem>
            : null
          }
          { !auth.isLogged()
            ? <NavItem><NavLink to='/login' className='nav-link'>Login</NavLink></NavItem>
            : null
          }
          { !auth.isLogged()
            ? <NavItem><NavLink to='/register' className='nav-link'>Register</NavLink></NavItem>
            : null
          }
          { auth.isAdmin()
            ? <NavItem><NavLink to='/admin' className='nav-link'>Admin</NavLink></NavItem>
            : null
          }
          { auth.isLogged()
            ? <NavItem><NavLink to='/profile' className='nav-link'>Profile</NavLink></NavItem>
            : null
          }
          { auth.isLogged()
            ? <NavItem><NavLink to='/logout' className='nav-link'>Logout</NavLink></NavItem>
            : null
          }
        </Nav>
      </Navbar>
    )
  }
}

export default Header
