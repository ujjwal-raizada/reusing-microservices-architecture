import React, { Component } from 'react'
import { Accordion, Card, Row, Col, ButtonGroup,
  Button } from 'react-bootstrap'
import CardText from './CardText'
import CardListGroup from './CardListGroup'


class RequestList extends Component {
  render() { 

    var requestList = this.props.requests.map((request, index) => {
      const { _id, title, description, params, url, 
        getRoute, postRoute, batchSize } = request

      return (
        <Card key={_id}>
          <Accordion.Toggle as={Card.Header} eventKey={index}>
            {title}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={index}>
            <Card.Body>
              <CardText title="Description" text={description}/>
              <CardListGroup title="Parameters" list={params}/>
              <CardText title="Host URL" text={url}/>
              <CardListGroup title="Routes" list={[getRoute, postRoute]}/>
              <CardText title="Batch Size" text={batchSize}/>              
              <Row>
                <Col xs={{ span: 4, offset: 10 }}>
                  <ButtonGroup size="sm" className="mb-2">
                    <Button
                      id={_id} 
                      variant="outline-primary"
                      onClick={this.props.handleSelect}
                      >
                      Select
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )
    })

    return (
      <Accordion>
        {requestList}
      </Accordion>        
    )
  }
}

export default RequestList
