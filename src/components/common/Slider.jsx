import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'

class Slider extends Component {
  constructor (props) {
    super(props)
    this.state = {
      images: this.props.images,
      currentImage: this.props.images[0]
    }
    this.nextImage = this.nextImage.bind(this)
    this.prevImage = this.prevImage.bind(this)
  }

  nextImage () {
    const images = this.props.images
    const nextImage = images[images.indexOf(this.state.currentImage) + 1] || images[0]
    this.setState({currentImage: nextImage})
  }

  prevImage () {
    const images = this.props.images
    const prevImage = images[images.indexOf(this.state.currentImage) - 1] || images[images.length - 1]
    this.setState({currentImage: prevImage})
  }

  render () {
    return (
      <Row>
        <Col xl='1'><span className='slider-arrow' onClick={this.prevImage}>&#10094;</span></Col>
        <Col xl='10'><img className='mw-100 mh-50' src={this.state.currentImage} alt='' /></Col>
        <Col xl='1'><span className='slider-arrow' onClick={this.nextImage}>&#10095;</span></Col>
      </Row>
    )
  }
}

export default Slider
