import React, { Component } from 'react'
import { Form } from 'react-bootstrap'

class MappingSelection extends Component {
    
    handleChange = event => {
        event.preventDefault()
        var {type, subType} = this.props.associatedMapping
        if(event.target.id === 'type') {
            type = event.target.value
            subType = this.props.allMappings.subTypes[type][0]
        } else if (event.target.id === 'subType') {
            subType = event.target.value
        }
        this.props.handleChange(type, subType)
    }

    render() {
        var {types, subTypes} = this.props.allMappings
        var {type, subType} = this.props.associatedMapping
        if(!type || !subType) {
            this.props.handleChange(types[0], subTypes[types[0]][0])
        }
        var typesList = types.map( (item, index) => (
            <option key={index} value={item}> {item} </option>
        ))
        
        var subTypesList = subTypes[type || types[0]].map( (item, index) => (
            <option key={index} value={item}> {item} </option>
        ))

        return (
            <Form>
                <Form.Group controlId='type'>
                    <Form.Label> Mapping Type </Form.Label>
                    <Form.Control 
                        as='select'
                        defaultValue={types[0]} 
                        value={type} 
                        onChange={this.handleChange}
                    >
                        {typesList}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='subType'>
                    <Form.Label> Mapping Subtype </Form.Label>
                    <Form.Control 
                        as='select'
                        defaultValue={subTypes[types[0]][0]}  
                        value={subType} 
                        onChange={this.handleChange}
                    >
                        {subTypesList}
                    </Form.Control>
                </Form.Group>
            </Form>
        ) 
    }
}

export default MappingSelection
