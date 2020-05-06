import React, { Component, Fragment } from 'react';
import {Nav, Navbar, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';

class Header extends Component {
  render() { 
    return (  
      <Fragment>            
        <Navbar bg="dark" variant="dark" sticky="top">
          <Navbar.Brand href="/home"> Microservices Transformations </Navbar.Brand>
          <Nav className="mr-auto">
              <Nav.Link href="/home"> <strong> Profile </strong> </Nav.Link>
              <NavDropdown title={<strong> Register </strong>} id="register">
              <NavDropdown.Item href="/register/service"> Service </NavDropdown.Item>
              <NavDropdown.Item href="/register/request"> Request </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/status"> <strong> Status </strong> </Nav.Link>
          </Nav>
          <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
        <br />
      </Fragment>
    );
  }
}

export default Header;
