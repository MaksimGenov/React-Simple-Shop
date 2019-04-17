import React, { Component } from 'react'
import { Form, FormGroup, Input, Button, Col, Row, Alert } from 'reactstrap'
import brandServices from '../../services/brandServices'
import categoryServices from '../../services/categoryServices'
import productServices from '../../services/productServices'
const successMsg = 'Product added Successfully!'
const errorMsg = 'Something went wrong, the product was not added!'
const initialState = {
  brand: '',
  model: '',
  price: '',
  description: '',
  color: '',
  images: {},
  categories: [],
  imageInputNames: []
}

export default class AddProductForm extends Component {
  constructor (props) {
    super(props)
    this.state = initialState

    this.handleInputChange = this.handleInputChange.bind(this)
    this.selectCategory = this.selectCategory.bind(this)
    this.addNewImageInput = this.addNewImageInput.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  async componentDidMount () {
    const brands = await brandServices.getAll()
    const availableCategories = await categoryServices.getAll()
    this.setState({brands, availableCategories})
  }

  async handleFormSubmit (event) {
    event.preventDefault()
    const { brand, model, categories, description, price, images } = this.state
    try {
      await productServices.create(brand, model, categories, description, price, images)
      this.setState({ success: true, error: false, ...initialState })
    } catch (error) {
      this.setState({ success: false, error: true })
    }
  }

  addNewImageInput () {
    let imageInputNames = this.state.imageInputNames
    const name = 'image-' + imageInputNames.length
    imageInputNames.push(name)
    this.setState({imageInputNames})
  }

  handleInputChange (event) {
    if (event.target.type === 'file' && event.target.name.startsWith('image')) {
      let images = this.state.images
      images[event.target.name] = event.target.files[0]
      return this.setState({images})
    }
    this.setState({[event.target.name]: event.target.value, success: false, error: false})
  }

  selectCategory (event) {
    const category = event.target.innerHTML
    let categories = this.state.categories
    if (categories.includes(category)) {
      const index = categories.indexOf(category)
      categories.splice(index, 1)
    } else {
      categories.push(category)
    }
    this.setState({categories})
  }

  render () {
    let { success, error, brands, categories, availableCategories, imageInputNames, model, description, price } = this.state
    if (!brands || !availableCategories) { return null }
    brands = brands.map(brand => <option key={brand._id} >{brand.name}</option>)
    availableCategories = availableCategories
      .map(category => <Button className='m-1' key={category._id} onClick={this.selectCategory}>{category.name}</Button>)
    let imageInputs = imageInputNames
      .map((input, index) => <Input className='mb-2' type='file' name={input} onChange={this.handleInputChange} key={index} />)
    return (
      <Row>
        <Col xl={{size: 6, offset: 2}}>
          <Form onSubmit={this.handleFormSubmit}>
            <FormGroup>
              <Input
                type='select'
                name='brand'
                onChange={this.handleInputChange}
              >
                <option value='' selected disabled hidden>Select brand...</option>
                {brands}
              </Input>
            </FormGroup>
            <FormGroup>
              {availableCategories}
              <Input type='text' value={categories} disabled />
            </FormGroup>
            <FormGroup>
              <Input
                type='text'
                name='model'
                placeholder='Enter the model...'
                value={model}
                onChange={this.handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Input
                type='textarea'
                name='description'
                placeholder='Describe the product...'
                value={description}
                onChange={this.handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Input
                name='price'
                type='number'
                min='1'
                step='0.01'
                placeholder='Enter the price...'
                value={price}
                onChange={this.handleInputChange} />
            </FormGroup>
            <FormGroup>
              {imageInputs}
            </FormGroup>
            <FormGroup>
              <Button color='info' onClick={this.addNewImageInput}>Add Image</Button>
            </FormGroup>
            <FormGroup><Button type='submit' color='success' className='btn-block'>Add Product</Button></FormGroup>
          </Form>
        </Col>
        <Col xl='4'>
          {success ? <Alert>{successMsg}</Alert> : null}
          {error ? <Alert>{errorMsg}</Alert> : null}
        </Col>
      </Row>
    )
  }
}
