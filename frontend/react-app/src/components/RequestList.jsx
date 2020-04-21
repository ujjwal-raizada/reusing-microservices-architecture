import React, { Component,Fragment } from 'react';
import { Accordion, Card, ListGroup, Row, Col,
  ButtonGroup, Button } from 'react-bootstrap'

class RequestList extends Component {
  render() { 

    var requestList = this.props.requests.map((request, index) => {
      const { title, description, params, url, 
        getRoute, postRoute, batchSize} = request
      
      var parameters = params.map(param => (
        <ListGroup.Item>{param}</ListGroup.Item> 
      ))

      return (
        <Card key={index}>
          <Accordion.Toggle as={Card.Header} eventKey={index}>
            {title}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={index}>
            <Card.Body>
              <Card.Title>Desciption</Card.Title>
              <Card.Text>
                {description}
              </Card.Text>
              <Card.Title>Parameters</Card.Title>
              <Card.Text>
                <ListGroup horizontal>
                  {parameters}
                </ListGroup>            
              </Card.Text>
              <Card.Title>Host URL</Card.Title>
              <Card.Text>
                {url}
              </Card.Text>
              <Card.Title>Routes</Card.Title>
              <Card.Text>
                <ListGroup horizontal>
                <ListGroup.Item>{getRoute}</ListGroup.Item> 
                <ListGroup.Item>{postRoute}</ListGroup.Item> 
                </ListGroup>
              </Card.Text>
              <Card.Title>Batch Size</Card.Title>
              <Card.Text>
                {batchSize}
              </Card.Text>
              <Row>
                <Col xs={{ span: 4, offset: 8 }}>
                  <ButtonGroup size="sm" className="mb-2">
                    <Button 
                      variant="outline-dark"
                      onClick={this.props.handleSelect}
                      >
                      Reset
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

export default RequestList;
