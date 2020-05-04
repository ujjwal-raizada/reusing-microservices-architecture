import React, { Component, Fragment } from 'react'
import {Row, Col} from 'react-bootstrap'
import Header from './Header'
import Sidebar from './Sidebar'


class Home extends Component {
  render() { 
    return (
      <Fragment>
        <Header/>
        <Row >
          <Col xs={2}>
            <Sidebar/>
          </Col>
          <Col>
            <h2 className="text-center"> Welcome to the <br/> Portal!!!</h2>
          </Col>
        </Row>
      </Fragment>
    )
  }
}

export default Home
