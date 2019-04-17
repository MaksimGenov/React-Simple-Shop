import React, { Component } from 'react'
import Product from '../products/Product'
import brandServices from '../../../services/brandServices'
import { Row, Col } from 'reactstrap'

export default class Brand extends Component {
  constructor (props) {
    super(props)
    this.state = {
      brand: null
    }
  }

  async fetchData () {
    const id = this.props.match.params.id
    const brand = await brandServices.getById(id)
    this.setState({brand})
  }

  componentDidMount () {
    this.fetchData()
  }

  async componentDidUpdate (prevProps) {
    if (this.props !== prevProps) {
      this.fetchData()
    }
  }

  render () {
    const { brand } = this.state
    if (!brand) { return null }
    let { products } = brand
    products = products.map(product => <Product product={product} key={product._id} />)
    return (
      <Col>
        {/* <Row>
          <Col xl={{size: 6, offset: 3}}><img src={imageUrl} /></Col>
        </Row> */}
        <Row>
          {products}
        </Row>
      </Col>
    )
  }
}
