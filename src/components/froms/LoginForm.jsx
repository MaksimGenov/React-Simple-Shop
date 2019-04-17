import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Row, Col, Form, FormGroup, Input, Label, Button, Tooltip, Alert } from 'reactstrap'
import userServices from '../../services/userServices'
const VALID_USERNAME_INFO = 'Username should start with letter, should be between 3 and 20 symbols long ' +
  "and can't contain special symbols or empty space!"
const VALID_PASSWORD_INFO = 'Password should be between 6-20 characters long, ' +
  'should contain digit, capital letter and small letter. ' +
  'Special symbols and empty spaces are not allowed!'

class RegisterForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: '',
      username: '',
      password: '',
      isUsernameTooltipOpen: false,
      isPasswordTooltipOpen: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmitForm = this.handleSubmitForm.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.toogleUsernameTooltip = this.toogleUsernameTooltip.bind(this)
    this.isPasswordTooltipOpen = this.isPasswordTooltipOpen.bind(this)
  }

  toogleUsernameTooltip () {
    this.setState({isUsernameTooltipOpen: !this.state.isUsernameTooltipOpen})
  }

  isPasswordTooltipOpen () {
    this.setState({isPasswordTooltipOpen: !this.state.isPasswordTooltipOpen})
  }

  handleCheckboxChange (event) {
    let name = event.target.name
    this.setState({[name]: !this.state[name]})
  }

  handleInputChange (event) {
    const target = event.target
    let value = target.value
    const name = target.name

    this.setState({ [name]: value })
  }

  async handleSubmitForm (event) {
    event.preventDefault()
    const { username, password, remember } = this.state
    const response = await userServices.login(username, password)
    console.log(response)
    const { userData, error } = response
    if (error) {
      return this.setState({error})
    }
    userServices.signIn(userData, remember)
  }

  render () {
    const {error} = this.state
    return (
      <Col xl={{size: 4, offset: 4}}>
        {error ? <Alert color='danger'>{error}</Alert> : null}
        <Row>
          <Col className='login-header'>
            <h3>Login</h3>
          </Col>
        </Row>
        <Row>
          <Col className='login-form'>
            <Form onSubmit={this.handleSubmitForm}>
              <FormGroup>
                <Input
                  id='UsernameInput'
                  className='mt-3'
                  type='text'
                  placeholder='Enter your username'
                  name='username'
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  required
                />
                <Tooltip
                  placement='right'
                  target='UsernameInput'
                  isOpen={this.state.isUsernameTooltipOpen}
                  toggle={this.toogleUsernameTooltip}
                >
                  {VALID_USERNAME_INFO}
                </Tooltip>
              </FormGroup>
              <FormGroup>
                <Input
                  id='PasswordInput'
                  type='password'
                  name='password'
                  placeholder='Enter your password'
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  required
                />
                <Tooltip
                  placement='right'
                  target='PasswordInput'
                  isOpen={this.state.isPasswordTooltipOpen}
                  toggle={this.isPasswordTooltipOpen}
                >
                  {VALID_PASSWORD_INFO}
                </Tooltip>
              </FormGroup>
              <FormGroup check>
                <Label>
                  <Input
                    type='checkbox'
                    name='remember'
                    value={this.state.remember}
                    onChange={this.handleCheckboxChange}
                  />
                  Remember me
                </Label>
              </FormGroup>
              <FormGroup>
                <Button type='submit' color='success'>Login</Button>
              </FormGroup>
              <FormGroup>
                <NavLink to='/register' className='ml-auto'>Register here!</NavLink>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Col>
    )
  }
}

export default RegisterForm
