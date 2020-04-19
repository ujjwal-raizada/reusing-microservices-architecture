import React, { Component, Fragment } from 'react'
import ServiceMapping from './ServiceMapping'
import Header from './Header'

class RegisterService extends Component {
  render () {
    return (
      <Fragment>
        <Header />
        <ServiceMapping />
      </Fragment>
    )
  }
}

export default RegisterService
