import React, { Component, Fragment } from 'react'
import ServiceMapping from './ServiceMapping'
import Header from './Header'

class RegisterService extends Component {
  componentDidMount() {
    sessionStorage.setItem('existingMS', 'test1')
    sessionStorage.setItem('requestedMS', 'Open Quiz Portal')
  }
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