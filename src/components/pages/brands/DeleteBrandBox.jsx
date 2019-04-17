import React, { Component } from 'react'
import { Card, CardBody, CardImg, Button } from 'reactstrap'

export default class DeleteBrandBox extends Component {
  render () {
    const { brand, deleteBrand } = this.props
    if (!brand) { return null }
    const {name, imageUrl} = brand
    return (
      <Card className='text-left col-md-2 m-1 zoom'>
        <CardImg top width='100%' src={imageUrl} alt='' />
        <CardBody className='p-0'>
          <p className='m-1'>{name}</p>
        </CardBody>
        <Button onClick={deleteBrand} color='danger' className='mb-2' data-id={brand._id}>Delete</Button>
      </Card>
    )
  }
}
