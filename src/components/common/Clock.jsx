import React, { Component } from 'react'

class Clock extends Component {
  constructor (props) {
    super(props)
    this.state = {
      time: new Date()
    }
  }

  componentDidMount () {
    this.interval = setInterval(() => this.tick(), 1000)
  }

  tick () {
    this.setState({time: new Date()})
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    return (
      <div>
        {this.state.time.toLocaleTimeString()}
      </div>
    )
  }
}

export default Clock
