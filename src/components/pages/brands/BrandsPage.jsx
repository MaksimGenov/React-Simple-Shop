import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'
import Brand from './Brand'
import { Nav, NavItem, Col, Row } from 'reactstrap'
import brandServices from '../../../services/brandServices'

export default class BrandsPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      brands: []
    }
  }

  async fetchData () {
    const brands = await brandServices.getAll()
    this.setState({brands})
  }

  componentDidMount () {
    this.fetchData()
  }

  render () {
    let { brands } = this.state
    const { match } = this.props
    if (!brands) { return null }
    brands = brands.map(brand => {
      return (
        <NavItem key={brand._id}>
          <NavLink
            className='nav-link'
            to={`${match.url}/${brand._id}`}
          >
            {brand.name}
          </NavLink>
        </NavItem>
      )
    })
    return (
      <Row>
        <Col xl='2'>
          <Nav pills vertical>
            { brands }
          </Nav>
        </Col>
        <Col>
          <Route exact path={match.url} render={() => <h1>Brands page</h1>} />
          <Route path={`${match.url}/:id`} component={Brand} />
        </Col>
      </Row>
    )
  }
}
