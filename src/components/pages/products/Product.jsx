import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Card, CardImg, CardBody } from 'reactstrap'

class Product extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirect: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({redirect: true})
  }

  render () {
    const { product } = this.props
    return (
      <Card className='text-left col-md-2 m-1 zoom' onClick={this.handleClick} >
        <CardImg top width='100%' src={product.imagesPath[0]} alt='' />
        <CardBody className='p-0'>
          <p className='m-1'>{product.brand}</p>
          <p className='m-1'>{product.model}</p>
          <p className='m-1'>{product.price}лв.</p>
        </CardBody>
        {this.state.redirect ? <Redirect to={'/products/details/' + product._id} /> : null }
      </Card>
    )
  }
}

export default Product
