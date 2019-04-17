import React, { Component } from 'react'
import { Col, Row, CardImg, Button } from 'reactstrap'

class CartProductBase extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { index, removeProduct } = this.props
    const { model, brand, price, imagesPath, _id } = this.props.product
    return (
      <tr>
        <td>{index + 1}</td>
        <td>
          <Row>
            <Col xl='2'>
              <CardImg width='100%' src={imagesPath[0]} alt='' />
            </Col>
            <Col xl='6'>
              Model: {model}
              <br />
              Brand: {brand}
              <br />
              <Button onClick={removeProduct} color='danger' data-id={_id}>Remove</Button>
            </Col>
          </Row>
        </td>
        <td>{price} lv.</td>
      </tr>
    )
  }
}

export default CartProductBase
