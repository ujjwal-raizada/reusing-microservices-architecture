import React, { Component, Fragment } from 'react'
import ServiceMapping from './ServiceMapping'
import Header from './Header'

class RegisterService extends Component {

  componentDidMount() {
    var existingMS = sessionStorage.getItem('serviceIds')
    var requestedMS = sessionStorage.getItem('requestId')

    if(!requestedMS || requestedMS === '') {
      this.props.history.push(`/requests`)
      return
    }
    if(!existingMS || existingMS === '') {
      this.props.history.push(`/services`)
      return
    }
  }

  render () {
    var existingMS = sessionStorage.getItem('serviceIds')
    var requestedMS = sessionStorage.getItem('requestId')
    return (
      existingMS && existingMS.length && requestedMS && requestedMS.length &&
      <Fragment>
        <Header />
        <ServiceMapping existingMS={existingMS} requestedMS={requestedMS}/>
      </Fragment>
    )
  }
}

export default RegisterService
