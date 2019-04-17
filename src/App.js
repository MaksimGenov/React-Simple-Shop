/* global */
import React, { Component } from 'react'
import Header from './components/common/Header'
import Menu from './components/common/Menu'
import AppRouter from './components/AppRouter'
import 'bootstrap-css-only'
import './App.css'
// import '../node_modules/bootstrap/dist/css/bootstrap.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isAuth: false,
      showLoginPopup: false
    }
    this.toogleLoginPopup = this.toogleLoginPopup.bind(this)
  }

  toogleLoginPopup () {
    this.setState({showLoginPopup: !this.state.showLoginPopup})
  }

  render () {
    return (
      <div className='container-fluid'>
        <Header />
        <Menu />
        <AppRouter />
      </div>
    )
  }
}

export default App
