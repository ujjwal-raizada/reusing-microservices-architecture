import React, { Component, Fragment } from 'react'
import { Accordion, Card, ListGroup, Row, Col,
  ButtonGroup, Button } from 'react-bootstrap'

class ServiceList extends Component {
  render() { 

    var serviceList = this.props.services.map((service, index) => {
      const { _id, title, developer, keywords, documentation, code_snippet,
        tech_stack, params, url, getRoute, postRoute, batchSize} = service
      
      var parameterList = params.map((param, ind) => (
        <ListGroup.Item key={ind}>{param}</ListGroup.Item> 
      ))

      var keywordList = keywords.map((keyword, ind) => (
        <ListGroup.Item key={ind}>{keyword}</ListGroup.Item> 
      ))

      var techList = tech_stack.map((item, ind) => (
        <ListGroup.Item key={ind}>{item}</ListGroup.Item> 
      ))

      return (
        <Card key={index}>
          <Accordion.Toggle as={Card.Header} eventKey={index}>
            {title}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={index}>
            <Card.Body>
              <Card.Title>Developer</Card.Title>
              <Card.Text>
                {developer}
              </Card.Text>
              <Card.Title>Keywords</Card.Title>
              <Card.Text>
                <ListGroup horizontal>
                  {keywordList}
                </ListGroup>            
              </Card.Text>              
              <Card.Title>Parameters</Card.Title>
              <Card.Text>
                <ListGroup horizontal>
                  {parameterList}
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
              <Card.Title>Tech Stack</Card.Title>
              <Card.Text>
                <ListGroup horizontal>
                  {techList}
                </ListGroup>            
              </Card.Text>   
              <Card.Title>Documentation</Card.Title>
              <Card.Text>
                {documentation}
              </Card.Text>
              <Card.Title>Code Snippets</Card.Title>
              <Card.Text>
                {code_snippet}
              </Card.Text>
              {
                this.props.controls &&
                <Row>
                  <Col xs={{ span: 4, offset: 10 }}>
                    <ButtonGroup size="sm" className="mb-2">
                      <Button
                        id={_id} 
                        variant="outline-dark"
                        onClick={this.props.handleAdd}
                        >
                        Add
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              }              
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )
    })

    return (
      <Accordion>
        {serviceList}
      </Accordion>        
    )
  }
}

export default ServiceList
