import React, { Component} from 'react'
import { Card, ButtonGroup, Button, ListGroup, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import config from 'react-global-configuration'


class RequestDetail extends Component {
  state = {
    requestDetail: null
  }

  componentDidMount() {
    const { requestId } = this.props
    const url = config.get('host_url') + config.get('routes.requestedById')

    axios.post(url, {micro_id: requestId})
    .then(res => {
      this.setState({
        requestDetail: res.data.micro
      })
    })
    .catch(console.log)
  }

  render() {
    if(this.state.requestDetail == null) {
      return null
    }

    const { title, description, params, url, 
      getRoute, postRoute, batchSize} = this.state.requestDetail
    
    var parameters = params.map(param => (
      <ListGroup.Item>{param}</ListGroup.Item> 
    ))

    return (
      <Card>
        <Card.Header>{title}</Card.Header>
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
          {
            this.props.controls &&
            <Row>
              <Col xs={{ span: 4, offset: 8 }}>
                <ButtonGroup size="sm" className="mb-2">
                  <Button 
                    variant="outline-primary"
                    href="/mapping"
                    >
                    Map
                  </Button>
                  <Button 
                    variant="outline-dark"
                    onClick={this.props.handleReset}
                    >
                    Reset
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          }   
        </Card.Body>
      </Card>
    )
  }
}

export default RequestDetail
