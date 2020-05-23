import React, { Component } from 'react'
import { Form, Container, Row } from 'react-bootstrap'
import MonacoEditor from 'react-monaco-editor'

class MappingAttributes extends Component {
    
    handleClick = event => {
        event.preventDefault()
        var name = event.target.name
        var args = this.props.microserviceMapping.function.arguments
        if(name === 'add') {
            args.push(null)
            this.props.handleArguments(args)
        } else if(name === 'remove') {
            args.pop()
            this.props.handleArguments(args)
        }
    }

    render() {
        const options = {
            selectOnLineNumbers: true
        }        
        var { type, subType } = this.props.microserviceMapping
        var code = this.props.microserviceMapping.function.code
        
        if(code.length === 0) {
            this.props.handleCode(this.props.templates[type][subType])
        }
        
        return (            
            <Container>
                <Row>
                    <Form.Group controlId='functionName'>
                        <Form.Label> Mapping Function's Name </Form.Label>
                        <Form.Control 
                            type='text'
                            value = {this.props.microserviceMapping.function.name || ''}
                            onChange = {event => {
                                event.preventDefault()
                                this.props.handleName(event.target.value)
                            }}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group controlId='code'>
                        <Form.Label> Function implementation </Form.Label>
                        <MonacoEditor
                            height="300"
                            width="500"
                            language="javascript"
                            theme="vs-dark"
                            defaultValue="\\enter code here"
                            value={this.props.microserviceMapping.function.code}
                            onChange={this.props.handleCode}
                            options={options}
                        />
                    </Form.Group>
                </Row>                    
            </Container>
        )        
    }
}

export default MappingAttributes
