import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Slider from '../../common/Slider'
import productServices from '../../../services/productServices'
import cartServices from '../../../services/cartServices'
import { Row, Col, Button, Alert } from 'reactstrap'
import auth from '../../../utils/Auth'

class ItemDetailsBase extends Component {
  constructor (props) {
    super(props)
    this.state = {
      product: null
    }
    this.addToCart = this.addToCart.bind(this)
  }

  async componentDidMount () {
    const id = this.props.match.params.id
    const product = await productServices.findById(id)
    this.setState({product})
  }

  async addToCart (event) {
    event.preventDefault()
    if (!auth.isLogged()) {
      return this.setState({error: 'You are not logged in!'})
    }
    let cart = await cartServices.get()
    let products = cart.products
    const product = this.state.product
    products.push(product)
    try {
      await cartServices.update(products)
      const success = 'Product Added to your cart!'
      this.setState({success})
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    let { product, success, error } = this.state
    if (!product) { return null }
    return (
      <Row className='mt-5'>
        { success ? <Col xl={{offset: 7}}><Alert>{success}</Alert></Col> : null }
        { error ? <Col xl={{offset: 7}}><Alert color='danger'>{error}</Alert></Col> : null }
        <Row>
          <Col xl='7'>
            <Slider images={product.imagesPath} />
          </Col>
          <Col xl='4'>
            <Row id='product-details-box' className='rounded'>
              <Col xl='12' className='product-price'>{product.price} лв.</Col>
              <Col xl='12' className='product-price mb-2'>Product details:</Col>
              <Col xl='12'><label>Brand:</label> {product.brand}</Col>
              <Col xl='12'><label>Model:</label> {product.model}</Col>
              <Col xl='12'><label>Categories:</label> {product.categories}</Col>
              <Col xl='12'><label>Description:</label><br /> {product.description}</Col>
              <Col xl='12' className='mt-2'>
                <Button className='btn-block' color='success' onClick={this.addToCart}>Add to Cart</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Row>
    )
  }
}

const ItemDetails = withRouter(ItemDetailsBase)

export default ItemDetails
