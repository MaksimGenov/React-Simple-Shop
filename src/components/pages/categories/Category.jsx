import React, { Component } from 'react'
import Product from '../products/Product'
import categoryServices from '../../../services/categoryServices'
import { Row } from 'reactstrap'

export default class Category extends Component {
  constructor (props) {
    super(props)
    this.state = {
      products: null
    }
  }

  async fetchData () {
    const id = this.props.match.params.id
    const category = await categoryServices.getById(id)
    const products = category.products
    this.setState({products})
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
    let { products } = this.state
    if (!products) { return null }
    products = products.map(product => <Product product={product} key={product._id} />)
    return (
      <Row>
        {products}
      </Row>
    )
  }
}
