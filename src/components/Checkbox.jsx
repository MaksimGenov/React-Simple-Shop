import React, { Component } from 'react'
const USERNAME_DESCRIPTION = 'Your username must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.'

export default class Checkbox extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange (event) {
    const target = event.target
    let value = target.value
    const name = target.name

    this.setState({ [name]: value })
    console.log(this.state)
  }

  handleCheckboxChange (event) {
    this.setState({[event.target.name]: !this.state[event.target.name]})
    console.log(this.state)
  }

  handleSubmit (event) {
    event.preventDefault()
    console.log(this.state)
    // let data = new FormData()
    // data.append('username', this.state.username)
    // data.append('password', this.state.password)
    // fetch('http://localhost:5000/api/users/register', {
    //   method: 'POST',
    //   body: data
    // })
    //   .then(res => res.json())
    //   .then(res => {
    //     sessionStorage.setItem('token', res.token)
    //     window.location.href = window.history.back()
    //     console.log(res.message)
    //   })
  }

  render () {
    return (
      <div className='col-xl-3 mx-auto mt-5'>
        <div className='login-header d-flex justify-content-center rounded-top'>
          <h3 className='col-xl-12'>Login</h3>
        </div>
        <div className='login-form d-flex justify-content-center rounded-bottom'>
          <form onSubmit={this.handleSubmit} className='col-xl-12'>
            <div className='form-group mt-3'>
              {this.state.showUsernameTooltip
                ? <small className='form-text text-muted'>{USERNAME_DESCRIPTION}</small> : null }
              <input type='text' className='form-control' onChange={this.handleInputChange} name='username' placeholder='enter your username' />
            </div>
            <div className='form-group'>
              <input type='password' className='form-control' onChange={this.handleInputChange} name='password' placeholder='enter your password' />
            </div>
            <div className='form-group'>
              <input type='checkbox' onChange={this.handleCheckboxChange} name='remember' />
              <label>Remeber me</label>
            </div>
            <input type='submit' value='Login' className='btn btn-success mb-2' onClick={this.handleSubmit} />
          </form>
        </div>
      </div>
    )
  }
}
