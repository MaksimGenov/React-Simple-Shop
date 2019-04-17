import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import {Nav, NavItem, Row} from 'reactstrap'

class Menu extends Component {
  render () {
    return (
      <Row className='justify-content-center'>
        <Nav pills>
          <NavItem><NavLink to='/brands' className='nav-link'>Brands</NavLink></NavItem>
          <NavItem><NavLink to='/categories' className='nav-link'>Category</NavLink></NavItem>
          <NavItem><NavLink to='/products/all' className='nav-link'>All</NavLink></NavItem>
        </Nav>
      </Row>
    )
  }
}

export default Menu
