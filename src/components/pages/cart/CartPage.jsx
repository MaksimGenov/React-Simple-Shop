import React, { Component } from 'react'
import { Row, Col, Table } from 'reactstrap'
import cartServices from '../../../services/cartServices'
import CartProduct from './CartProduct'

export default class CartPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cart: null
    }
    this.removeProduct = this.removeProduct.bind(this)
  }

  async componentDidMount () {
    const cart = await cartServices.get()
    this.setState({cart})
  }

  async removeProduct (event) {
    const productId = event.target.attributes['data-id'].nodeValue
    let cart = this.state.cart
    cart.products = cart.products.filter(p => p._id !== productId)
    try {
      await cartServices.update(cart.products)
      this.setState({cart})
    } catch (error) {
      return console.log(error)
    }
  }

  render () {
    const { cart } = this.state
    if (!cart) { return null }
    let { products, user } = cart
    products = (products || [])
    const total = products.reduce((p1, p2) => p1 + p2.price, 0)
    products = products.map((product, index) =>
      <CartProduct removeProduct={this.removeProduct} product={product} index={index} key={product._id} />)
    return (
      <Col>
        <Row>{user.username}'s shopping Cart</Row>
        <Col xl={{size: 8, offset: 2}}>
          <Table striped size='md'>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {products}
            </tbody>
            <tfoot>
              <tr><td /><td /><td>total: {total}</td></tr>
            </tfoot>
          </Table>
        </Col>
      </Col>
    )
  }
}
