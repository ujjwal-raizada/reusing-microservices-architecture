import React, { Component,Fragment } from 'react';
import {Row, Col} from 'react-bootstrap'
import axios from 'axios'
import config from 'react-global-configuration'
import Header from './Header';
import Sidebar from './Sidebar' ;
import ServiceList from './ServiceList'
import RequestDetail from './RequestDetail'
import SelectedServices from './SelectedServices'

class Services extends Component {
  state = {
    services: null,
    requestId: null,
    serviceIds: null
  }

  componentDidMount() {
    const requestId = sessionStorage.getItem('requestId')
    var serviceIds = sessionStorage.getItem('serviceIds')
    serviceIds = serviceIds.split(/\s*,\s*/)

    this.setState({
      requestId: requestId,
      serviceIds: serviceIds
    })

    const url = config.get('host_url') + config.get('routes.allExisting')
    axios.get(url)
    .then(res => {
      this.setState({
        services: res.data.micros
      })
    })
    .catch(console.log) 
  }

  addService = event => {
    event.preventDefault()
    const serviceId = event.target.id
    var serviceIds = sessionStorage.getItem('serviceIds')
    if(serviceIds == null)
      serviceIds = ''
    serviceIds = serviceIds + serviceId + ', '
    sessionStorage.setItem('serviceIds', serviceIds)
    serviceIds = serviceIds.split(/\s*,\s*/)
    this.setState({
      serviceIds: serviceIds
    })
  }

  popService = event => {
    event.preventDefault()
    var serviceIds = sessionStorage.getItem('serviceIds')

    if(serviceIds !== '') {
      serviceIds = serviceIds.slice(0, -2)
      var secondLast = serviceIds.lastIndexOf(', ')
      var newLength = (secondLast !== -1 ? secondLast + 2 : 0)
      serviceIds = serviceIds.slice(0, newLength)

      sessionStorage.setItem('serviceIds', serviceIds)

      serviceIds = serviceIds.split(/\s*,\s*/)      
      this.setState({
        serviceIds: serviceIds
      })
    }
  }

  resetRequested = event => {
    event.preventDefault()
    sessionStorage.removeItem('requestId')
    this.setState({
      requestId: null
    })
  }

  render() { 
    var { requestId, services, serviceIds } = this.state
    
    return (
      <Fragment>
        <Header/>
        <Row >
          <Col xs={2}>
            <Sidebar/>
          </Col>
          <Col xs={6}>
            {
              services && serviceIds &&
              <SelectedServices 
                services={services} 
                serviceIds={serviceIds}
                handlePop={this.popService}
                />
            }  
            <div>
              {
                services &&
                <ServiceList 
                services={services} 
                handleAdd={this.addService}
                controls={true}
              />
              }              
            </div>
          </Col>
          <Col>
          {
            requestId && 
            <RequestDetail 
              requestId={requestId} 
              handleReset={this.resetRequested}
              controls={true}
            />
          }
          </Col>
        </Row>
      </Fragment>  
    )
  }
}

export default Services;
