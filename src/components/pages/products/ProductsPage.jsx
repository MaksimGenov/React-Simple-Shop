import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Product from './Product'
import productServices from '../../../services/productServices'

class ProductsPageBase extends Component {
  constructor (props) {
    super(props)
    this.state = {
      products: []
    }
  }

  async fetchData () {
    const products = await productServices.findAll()
    this.setState({products})
  }

  componentDidMount () {
    this.props.history.push(this.props.location.url)
    this.fetchData()
  }

  componentDidUpdate (prevProps) {
    if (prevProps !== this.props) {
      this.fetchData()
    }
  }

  render () {
    let { products } = this.state
    if (!products) { return null }
    products = products.map(product => <Product product={product} key={product._id} />)

    return (
      <div className='container'>
        <div className='row justify-content-center'>
          { products }
        </div>
      </div>
    )
  }
}

const ProductsPage = withRouter(ProductsPageBase)

export default ProductsPage
