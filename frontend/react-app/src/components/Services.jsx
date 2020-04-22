import React, { Component,Fragment } from 'react';
import {Row, Col, Container, Accordion, Card, Button} from 'react-bootstrap'
import axios from 'axios'
import config from 'react-global-configuration'
import Header from './Header';
import Sidebar from './Sidebar' ;
import ServiceList from './ServiceList'
import RequestDetail from './RequestDetail'

class Services extends Component {
  state = {
    service: [],
    requestId: null
  }

  componentDidMount() {
    const requestId = sessionStorage.getItem('requestId')
    this.setState({
      requestId: requestId
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

  resetSelected = event => {
    event.preventDefault()
    sessionStorage.removeItem('requestId')
    this.setState({
      requestId: null
    })
  }

  render() { 
    const { requestId, services } = this.state
    
    return (
      <Fragment>
        <Header/>
        <Row >
          <Col xs={2}>
            <Sidebar/>
          </Col>
          <Col xs={6}>
            <div>
              {
                services &&
                <ServiceList 
                services={services} 
                handleSelect={this.setSelected}
              />
              }              
            </div>
          </Col>
          <Col>
          {
            requestId && 
            <RequestDetail 
              requestId={requestId} 
              handleReset={this.resetSelected}
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
