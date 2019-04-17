import React, { Component } from 'react'
import { Row, Col, Form, FormGroup, Input, Button, Alert } from 'reactstrap'
import categoryServices from '../../services/categoryServices'
const successMsg = 'Category added Successfully!'
const errorMsg = 'Something went wrong, the category was not added!'

export default class AddCategoryForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      redirecr: false
    }

    this.handleSubmitForm = this.handleSubmitForm.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  async handleSubmitForm (event) {
    event.preventDefault()
    const name = this.state.name
    try {
      await categoryServices.create(name)
      this.setState({success: true, error: false, name: ''})
    } catch (error) {
      this.setState({success: false, error: true})
    }
  }

  handleInputChange (event) {
    this.setState({[event.target.name]: event.target.value, success: false, error: false})
  }

  render () {
    let { name, success, error } = this.state
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
              />
            </FormGroup>
            <FormGroup>
              <Button type='submit' color='success'>Add Category</Button>
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
