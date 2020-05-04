import React, { Component } from 'react'
import { Card, ButtonGroup, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import config from 'react-global-configuration'
import CardText from './CardText'
import CardListGroup from './CardListGroup'


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
    if(!this.state.requestDetail) {
      return null
    }

    const { title, description, params, url, 
      getRoute, postRoute, batchSize} = this.state.requestDetail

    return (
      <Card>
        <Card.Header> {title} </Card.Header>
        <Card.Body>
          <CardText title="Description" text={description}/>
          <CardListGroup title="Parameters" list={params}/>
          <CardText title="Host URL" text={url}/>
          <CardListGroup title="Routes" list={[getRoute, postRoute]}/>
          <CardText title="Batch Size" text={batchSize}/>
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
