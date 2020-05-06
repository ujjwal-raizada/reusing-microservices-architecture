import React, { Component } from 'react'
import {Form, Button, Card, Container, Row} from 'react-bootstrap' 
import Header from './Header'
import {Link} from 'react-router-dom';

class Login extends Component {

    render(){
           return(
               <div>
                    <Header/>
                    <Container justify="center">  
                        <Row >
                            <Card bg = "dark" style={{ width: '35rem', margin: "1rem", padding:"1rem" }} text="white" >

                                <center> <Card.Title> Login </Card.Title> </center>

                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label> Email address </Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" />
                                        <Form.Text className="text-muted">
                                        We never share your email with any third party.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label> Password </Form.Label>
                                        <Form.Control type="password" placeholder="Password" />
                                    </Form.Group> 

                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Remember Me" />
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                        Login
                                    </Button>

                                    <Form.Text className="text-muted">
                                        <span> Don't have an account, register .   
                                            <Link to="/register" >
                                                here
                                            </Link> 
                                        </span>
                                    </Form.Text>
                                </Form>

                            </Card>
                        </Row>
                    </Container>
                </div>
                )
    }

}

export default Login
