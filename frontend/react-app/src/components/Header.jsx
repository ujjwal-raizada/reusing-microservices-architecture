import React, { Component, Fragment } from 'react';
import {Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap';

class Header extends Component {

    render() { 
        return (  
            <Fragment>            
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/home"> Reusing Microservices </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#pricing"><strong> Hello  Alex </strong></Nav.Link>
                        <Nav.Link href="/microservices"><strong>View All Microservices</strong></Nav.Link>
                        <Nav.Link href="/mapping"><strong>Mappings</strong></Nav.Link>
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
