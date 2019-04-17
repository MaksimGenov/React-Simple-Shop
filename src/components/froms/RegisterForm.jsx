import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Row, Col, Form, FormGroup, Input, Label, Button, Tooltip, FormFeedback, Alert } from 'reactstrap'
import userServices from '../../services/userServices'
const validUsernameRegex = /^[a-zA-Z]\w{2,20}$/
const validPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,20}$/
const DEFAULT_USERNAME_ERROR_MSG = 'Invalid username!'
const VALID_USERNAME_INFO = 'Username should start with letter, should be between 3 and 20 symbols long ' +
  "and can't contain special symbols or empty space!"
const VALID_PASSWORD_INFO = 'Password should be between 6-20 characters long, ' +
  'should contain digit, capital letter and small letter. ' +
  'Special symbols and empty spaces are not allowed!'

class RegisterForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errorMsg: '',
      username: '',
      password: '',
      repeatPassword: '',
      isUsernameTooltipOpen: false,
      isPasswordTooltipOpen: false,
      isUsernameValid: false,
      isPasswordValid: false,
      doesPasswordsMatch: false,
      invalidUsernameMsg: DEFAULT_USERNAME_ERROR_MSG
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmitForm = this.handleSubmitForm.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.toogleUsernameTooltip = this.toogleUsernameTooltip.bind(this)
    this.tooglePasswordTooltip = this.tooglePasswordTooltip.bind(this)
  }

  toogleUsernameTooltip () {
    this.setState({isUsernameTooltipOpen: !this.state.isUsernameTooltipOpen})
  }

  tooglePasswordTooltip () {
    this.setState({isPasswordTooltipOpen: !this.state.isPasswordTooltipOpen})
  }

  handleCheckboxChange (event) {
    const name = event.target.name
    this.setState({[name]: !this.state[name]})
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.value
    const name = target.name

    if (name === 'username') {
      this.setState({ [name]: value, isUsernameValid: validUsernameRegex.test(value) })
    } else if (name === 'password') {
      this.setState({ [name]: value, isPasswordValid: validPasswordRegex.test(value) })
    } else if (name === 'repeatPassword') {
      this.setState({[name]: value, doesPasswordsMatch: this.state.password === value})
    }
  }

  async handleSubmitForm (event) {
    event.preventDefault()
    const { remember, username, password, repeatPassword } = this.state
    const response = await userServices.register(username, password, repeatPassword)
    const {errorMsg, userData} = response
    if (errorMsg) {
      return this.setState({errorMsg})
    }
    userServices.signIn(userData, remember)
  }

  render () {
    const {errorMsg} = this.state
    return (
      <Col xl={{size: 4, offset: 4}}>
        { errorMsg ? <Col xl='12'><Alert color='danger'>{errorMsg}</Alert></Col> : null }
        <Row>
          <Col className='login-header'>
            <h3>Register</h3>
          </Col>
        </Row>
        <Row>
          <Col className='login-form'>
            <Form onSubmit={this.handleSubmitForm}>
              <FormGroup>
                <Input
                  id='UsernameInput'
                  name='username'
                  type='text'
                  placeholder='Enter your username'
                  className='mt-3'
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  valid={this.state.isUsernameValid}
                  invalid={!this.state.isUsernameValid}
                />
                <Tooltip
                  placement='right'
                  target='UsernameInput'
                  isOpen={this.state.isUsernameTooltipOpen}
                  toggle={this.toogleUsernameTooltip}
                >
                  {VALID_USERNAME_INFO}
                </Tooltip>
                <FormFeedback valid>Username is valid!</FormFeedback>
                <FormFeedback>{this.state.invalidUsernameMsg}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Input
                  id='PasswordInput'
                  name='password'
                  type='password'
                  placeholder='Enter your password'
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  valid={this.state.isPasswordValid}
                  invalid={!this.state.isPasswordValid}
                />
                <Tooltip
                  placement='right'
                  target='PasswordInput'
                  isOpen={this.state.isPasswordTooltipOpen}
                  toggle={this.tooglePasswordTooltip}
                >
                  {VALID_PASSWORD_INFO}
                </Tooltip>
                <FormFeedback valid>Password is valid!</FormFeedback>
                <FormFeedback>Invalid password!</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Input
                  type='password'
                  name='repeatPassword'
                  placeholder='Repeat your password'
                  value={this.state.repeatPassword}
                  onChange={this.handleInputChange}
                  valid={this.state.doesPasswordsMatch}
                  invalid={!this.state.doesPasswordsMatch}
                />
                <FormFeedback valid>Passwords match!</FormFeedback>
                <FormFeedback>Passwords do not match!</FormFeedback>
              </FormGroup>
              <FormGroup check>
                <Label>
                  <Input
                    type='checkbox'
                    name='remember'
                    value={this.state.password}
                    onChange={this.handleCheckboxChange}
                  />
                  Remember me
                </Label>
              </FormGroup>
              <FormGroup>
                <Button type='submit' color='success'>Register</Button>
              </FormGroup>
              <FormGroup>
                <NavLink to='/login' className='ml-auto'>Login here!</NavLink>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Col>
    )
  }
}

export default RegisterForm
