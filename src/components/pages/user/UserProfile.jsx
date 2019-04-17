import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import auth from '../../../utils/Auth'

export default class UserProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  async componentDidMount () {
    const username = auth.getUsername()
    this.setState({username})
  }

  render () {
    return (
      <Col>
        <Row>
          <Col><h2>Welcome to your Profile Page, {this.state.username}</h2></Col>
        </Row>
        <Row>
          <Col><h3>{this.state.username}</h3></Col>
        </Row>
      </Col>
    )
  }
}
