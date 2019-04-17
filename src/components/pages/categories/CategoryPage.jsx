import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'
import Category from './Category'
import { Nav, NavItem, Col, Row } from 'reactstrap'
import categoryServices from '../../../services/categoryServices'

export default class CategoryPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      categories: []
    }
  }

  async fetchData () {
    const categories = await categoryServices.getAll()
    this.setState({categories})
  }

  componentDidMount () {
    this.fetchData()
  }

  render () {
    let { categories } = this.state
    const { match } = this.props
    if (!categories) { return null }
    categories = categories.map(category => {
      return (
        <NavItem key={category._id}>
          <NavLink
            className='nav-link'
            to={`${match.url}/${category._id}`}
          >
            {category.name}
          </NavLink>
        </NavItem>
      )
    })
    return (
      <Row>
        <Col xl='2'>
          <Nav pills vertical>
            { categories }
          </Nav>
        </Col>
        <Col>
          <Route exact path={match.url} render={() => <h1>Categories Page</h1>} />
          <Route path={`${match.url}/:id`} component={Category} />
        </Col>
      </Row>
    )
  }
}
