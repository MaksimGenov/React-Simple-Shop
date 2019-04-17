import React, { Component } from 'react'
import { Col, Row, NavItem, Nav } from 'reactstrap'
import { NavLink, Route } from 'react-router-dom'
import AddProductForm from '../../froms/AddProductForm'
import AddCategoryForm from '../../froms/AddCategoryForm'
import AddBrandForm from '../../froms/AddBrandForm'
import DeleteBrandPage from '../brands/DeleteBrandPage'
import auth from '../../../utils/Auth'

export default class AdminPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isAdmin: auth.isAdmin()
    }
  }

  render () {
    // if (!this.state.isAdmin) {
    //   return <h1>unauthorized</h1>
    // }
    let { match } = this.props
    return (
      <Row>
        <Col xl='2'>
          <Nav vertical pills>
            <NavItem><NavLink to={match.url + '/addProduct'} className='nav-link'>Add Product</NavLink></NavItem>
            <NavItem><NavLink to={match.url + '/addCategory'} className='nav-link'>Add Category</NavLink></NavItem>
            <NavItem><NavLink to={match.url + '/addBrand'} className='nav-link'>Add Brand</NavLink></NavItem>
            <NavItem><NavLink to={match.url + '/deleteBrand'} className='nav-link'>Delete Brand</NavLink></NavItem>
          </Nav>
        </Col>
        <Col>
          <Route path={match.url + '/addBrand'} component={AddBrandForm} />
          <Route path={match.url + '/addProduct'} component={AddProductForm} />
          <Route path={match.url + '/addCategory'} component={AddCategoryForm} />
          <Route path={match.url + '/deleteBrand'} component={DeleteBrandPage} />
        </Col>
      </Row>
    )
  }
}
