import React, { Component } from 'react'
import { Row, Col, Form, FormGroup, Input, Button, Alert } from 'reactstrap'
import brandServices from '../../services/brandServices'
const successMsg = 'Brand added Successfully!'
const errorMsg = 'Something went wrong, the brand was not added!'

export default class AddBrandForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      image: null
    }

    this.handleSubmitForm = this.handleSubmitForm.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelectFile = this.handleSelectFile.bind(this)
  }

  async handleSubmitForm (event) {
    event.preventDefault()
    const name = this.state.name
    const description = this.state.description
    const image = this.state.image
    try {
      await brandServices.create(name, description, image)
      this.setState({success: true, error: null, name: '', description: '', image: null})
    } catch (error) {
      this.setState({success: null, error: true})
    }
  }

  handleSelectFile (event) {
    this.setState({[event.target.name]: event.target.files[0], success: false, error: false})
  }

  handleInputChange (event) {
    this.setState({[event.target.name]: event.target.value, success: false, error: false})
  }

  render () {
    let { name, success, error, description } = this.state
    return (
      <Row>
        <Col xl={{size: 6, offset: 2}}>
          <Form onSubmit={this.handleSubmitForm}>
            <FormGroup>
              <Input
                name='name'
                placeholder='Enter name...'
                value={name}
                onChange={this.handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                name='description'
                type='textarea'
                placeholder='Description...'
                value={description}
                onChange={this.handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                name='image'
                type='file'
                placeholder='add...'
                onChange={this.handleSelectFile}
                required
              />
            </FormGroup>
            <FormGroup>
              <Button type='submit' color='success'>Add Brand</Button>
            </FormGroup>
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
