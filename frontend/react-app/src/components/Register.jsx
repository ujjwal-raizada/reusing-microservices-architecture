import React, { Component } from 'react'
import {Form, Button, Card, Container, Row} from 'react-bootstrap' 
import {Redirect} from 'react-router-dom';
import Header from './Header'
import config from 'react-global-configuration'
import axios from 'axios'

class Register extends Component {

    state = {
        email:"",
        password:""
    }

    handleSubmit = (email, password) => {
        console.log("yes")
        const url = config.get('host_url') + config.get('routes.registerUser') ;
        console.log( email + " " + password);
        axios
        .post(url, {
            email :  email,
            password: password
        })
        .then(res => {
            if( res.data.message === "Signup successful"){
                console.log(res.data.message)
                return <Redirect to = "/login" />;
            }else{
                alert("Registration failed !!");
            }
        });

    }
    render(){
        const { email, password } = this.state;
        return(
            <div>
            <Header/>
            <Container justify="center">  
                    <Row >
                        <Card bg = "dark" style={{ width: '35rem', margin: "1rem", padding:"1rem" }} text="white" >

                            <center> <Card.Title> Register </Card.Title> </center>

                            <Form onSubmit = {() => this.handleSubmit(email,password) } >
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label> Email address </Form.Label>

                                    <Form.Control 
                                    type="email" 
                                    placeholder="Enter email" 
                                    onChange = {indicator => this.setState({ email: indicator.target.value })} />

                                    <Form.Text className="text-muted">
                                    We never share your email with any third party.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label> Password </Form.Label>

                                    <Form.Control 
                                    type="password" 
                                    placeholder="Password" 
                                    onChange = {indicator => this.setState({ password: indicator.target.value })} />

                                </Form.Group>

                                <Button variant="primary" type="submit" >
                                    Submit
                                </Button>                                    
                            </Form>

                        </Card>
                    </Row>
                </Container>
            </div>
        )
    }

}

export default Register
