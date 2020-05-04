import React, { Component } from 'react'
import { Card, ListGroup } from 'react-bootstrap'

class CardListGroup extends Component {
  render() {
    const { title, list } = this.props

    var listItems = list.map((item, index) => (
      <ListGroup.Item 
        key={index} 
        variant="secondary" 
        action
        > 
        {item}
      </ListGroup.Item> 
    ))

    return (
      <Card.Text>
        <strong> {title}<br/> </strong>
        <ListGroup horizontal >
          {listItems}
        </ListGroup>            
      </Card.Text>
    )
  }
}

export default CardListGroup
