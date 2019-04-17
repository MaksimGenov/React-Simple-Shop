import React, { Component } from 'react'
import brandServices from '../../../services/brandServices'
import { Row } from 'reactstrap'
import DeleteBrandBox from './DeleteBrandBox'

export default class DeleteBrandPage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.deleteBrand = this.deleteBrand.bind(this)
  }

  async componentDidMount () {
    const brands = await brandServices.getAll()
    this.setState({brands})
  }

  async deleteBrand (event) {
    const brandId = event.target.attributes['data-id'].nodeValue
    await brandServices.delete(brandId)
    let {brands} = this.state
    brands = brands.filter(brand => (brand._id !== brandId))
    this.setState({brands})
  }

  render () {
    let { brands } = this.state
    if (!brands) { return null }
    brands = brands.map(brand => <DeleteBrandBox brand={brand} deleteBrand={this.deleteBrand} key={brand._id} />)
    return (
      <Row>
        {brands}
      </Row>
    )
  }
}
