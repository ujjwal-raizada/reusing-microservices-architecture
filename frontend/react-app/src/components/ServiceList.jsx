import React, { Component } from 'react'
import { Accordion, Card, Row, Col, ButtonGroup, 
  Button } from 'react-bootstrap'
import CardText from './CardText'
import CardListGroup from './CardListGroup'


class ServiceList extends Component {
  render() { 

    var serviceList = this.props.services.map((service, index) => {
      const { _id, title, developer, keywords, documentation, code_snippet,
        tech_stack, params, url, getRoute, postRoute, batchSize } = service

      return (
        <Card key={_id}>
          <Accordion.Toggle as={Card.Header} eventKey={index}>
            {title}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={index}>
            <Card.Body>              
              <CardText title="Developer" text={developer}/>
              <CardListGroup title="Keywords" list={keywords}/>
              <CardListGroup title="Parameters" list={params}/> 
              <CardText title="Host URL" text={url}/>
              <CardListGroup title="Routes" list={[getRoute, postRoute]}/>
              <CardText title="Batch Size" text={batchSize}/>
              <CardListGroup title="Techstack" list={tech_stack}/>
              <CardText title="Documentation" text={documentation}/>
              <CardText title="Code Snippets" text={code_snippet}/>              
              {
                this.props.controls &&
                <Row>
                  <Col xs={{ span: 4, offset: 10 }}>
                    <ButtonGroup size="sm" className="mb-2">
                      <Button
                        id={_id} 
                        variant="outline-primary"
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
