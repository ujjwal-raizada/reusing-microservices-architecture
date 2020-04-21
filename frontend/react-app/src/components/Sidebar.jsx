import React, { Component } from 'react'
import {Navbar, Nav} from 'react-bootstrap'


class Sidebar extends Component {
  render() { 
    return ( 
      <Navbar bg="dark" variant="dark">
        <Nav className="flex-column">
          <Nav.Item>
            <Nav.Link href="/"> <strong> Home </strong> </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/requests"> <strong> Requests </strong> </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/services"> <strong> Services </strong> </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>   
    );
  }
}

export default Sidebar; 
