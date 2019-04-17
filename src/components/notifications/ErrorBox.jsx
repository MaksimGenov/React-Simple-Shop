import React from 'react'
import { Row } from 'reactstrap'

const ErrorBox = (message) => (
  <Row className='error-box'>{message}</Row>
)

export default ErrorBox
