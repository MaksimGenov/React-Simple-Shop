import React, { Component } from 'react'
import Category from './Category'
import categoryServices from '../../../services/categoryServices'

export default class CategoriesPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      categories: []
    }
  }

  async fetchData () {
    const categories = await categoryServices.getAll()
    this.setState({categories})
  }

  componentDidMount () {
    this.fetchData()
  }

  render () {
    let {categories} = this.state
    if (!categories) {
      return null
    }
    categories = categories.map(category => <Category category={category} key={category._id} />)
    return (
      <div className='container'>
        <div className='row justify-content-center'>
          { categories }
        </div>
      </div>
    )
  }
}
