import React, { Component } from 'react'
import { Card } from 'react-bootstrap'

class CardText extends Component {
  render() {
    const { title, text } = this.props

    return (
      <Card.Text>
        <strong> {title}<br/> </strong>
        {text}         
      </Card.Text>
    )
  }
}

export default CardText
