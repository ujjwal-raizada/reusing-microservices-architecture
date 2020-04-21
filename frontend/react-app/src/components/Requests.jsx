import React, { Component,Fragment } from 'react'
import {Row, Col, Container, Accordion, Card, } from 'react-bootstrap'
import axios from 'axios'
import config from 'react-global-configuration'
import Header from './Header'
import Sidebar from './Sidebar'
import RequestList from './RequestList'
import RequestDetail from './RequestDetail'

class Requests extends Component {
  state = {
    requests: [],
    requestId: null
  }

  componentDidMount() {
    const requestId = sessionStorage.getItem('requestId')
    this.setState({
      requestId: requestId
    })

    const url = config.get('host_url') + config.get('routes.allRequested')
    axios.get(url)
    .then(res => {
      this.setState({
        requests: res.data.micros
      })
    })
    .catch(console.log)    
  }

  setSelected = event => {
    event.preventDefault()
    const requestId = event.target.name
    sessionStorage.setItem('requestId', requestId)
    this.setState({
      requestId: requestId
    })
  }

  resetSelected = event => {
    event.preventDefault()
    sessionStorage.removeItem('requestId')
    this.setState({
      requestId: null
    })
  }
  
  render() { 
    const { requestId, requests } = this.state

    return (
      <Fragment>
        <Header/>
        <Row >
          <Col xs={2}>
            <Sidebar/>
          </Col>
          <Col xs={6}>
            <div>
              <RequestList 
                requests={requests} 
                handleSelect={this.setSelected}
              />
            </div>
          </Col>
          <Col>
          {
            requestId && 
            <RequestDetail 
              requestId={requestId} 
              handleReset={this.resetSelected}
            />
          }
          </Col>
        </Row>
      </Fragment>        
    )
  }
}

export default Requests;
