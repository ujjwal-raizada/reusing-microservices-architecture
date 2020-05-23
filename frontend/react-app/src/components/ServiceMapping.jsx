import React, { Component } from 'react'
import { Container, Row, Col, ButtonGroup, 
  Button, Spinner } from 'react-bootstrap'
import axios from 'axios'
import config from "react-global-configuration"
import ParamList from './ParamList'
import MappingSelection from './MappingSelection'
import MappingAttributes from './MappingAttributes'


class ServiceMapping extends Component {
  state = {
    parameter: null,
    mapping: {
      'type': null,
      'subType': null
    },
    microserviceMapping: null,
    allMappings: null,
    requestedMS: '',
    existingMS: '',
    requestParameters: {}
  }

  componentDidMount() {        
    var { existingMS, requestedMS } = this.props
    existingMS = existingMS.slice(0, -2).split(/\s*,\s*/)

    this.setState({
      existingMS: existingMS,
      requestedMS: requestedMS
    }) 

    const host = config.get('host_url')

    axios.all([
      axios.get(host + config.get('routes.allTransformations')),
      axios.get(host + config.get('routes.allTemplates')),
      axios.post(host + config.get('routes.requestedById'),
        {'micro_id' : requestedMS}),
      axios.post(host + config.get('routes.mapping'),
        {'existing': existingMS, 'requested': requestedMS}),
    ])
    .then(responses => {
      let allTransformations = responses[0].data
      let allTemplates = responses[1].data
      let allMappings = {types: [], subTypes: {}}
      let templates = {}
      allMappings.types = allTransformations.map(type => type.name)
      allTransformations.forEach(type => {
        templates[type.name] = {}
        let list = []
        allTemplates.forEach(subType => {
          if(subType.transformation === type._id) {
            list.push(subType.name)
            templates[type.name][subType.name] = subType.code
          }
        })
        allMappings.subTypes[type.name] = list
      });
      this.setState({
        allMappings: allMappings,
        templates: templates,
        allTransformations: allTransformations,
        allTemplates: allTemplates,
        requestedMicroservice: responses[2].data.micro,
        microserviceMapping: responses[3].data.mapping,
        originalMapping: responses[3].data.mapping,
        parameter: responses[3].data.mapping.parameters[0]
      })
    })
    .catch(console.log)
  }

  selectParam = param => {
    this.setState(state => ({
      parameter: param,
      mapping: {
        type: state.microserviceMapping.mappings[param].type,
        subType: state.microserviceMapping.mappings[param].subType
      }
      })
    )
    this.updateArguments()
  }

  selectMapping = (type, subType) => {
    this.setState(state => {            
      var microserviceMapping = {...state.microserviceMapping}
      microserviceMapping.mappings[state.parameter].type = type
      microserviceMapping.mappings[state.parameter].subType = subType
      return {
        mapping: {
          'type': type,
          'subType': subType
        },
        microserviceMapping: microserviceMapping
      }
    })
  }

  handleName = value => {
    this.setState(state => {
      var microserviceMapping = {...state.microserviceMapping}
      microserviceMapping.mappings[state.parameter].function.name = value
      return {
        microserviceMapping: microserviceMapping
      }
    })
  }

  handleArguments = value => {
    this.setState(state => {
      var microserviceMapping = {...state.microserviceMapping}
      var { requestParameters } = state
      if(requestParameters[value]) {
        requestParameters[value] = false
      } else {
        requestParameters[value] = true
      }
      microserviceMapping.mappings[state.parameter].function.arguments
       = Object.keys(requestParameters).filter(key => requestParameters[key])
      return {
        microserviceMapping: microserviceMapping,
        requestParameters: requestParameters
      }
    })
  }

  updateArguments = () => {
    this.setState(state => {
      var microserviceMapping = {...state.microserviceMapping}
      var { requestParameters } = state
      microserviceMapping.mappings[state.parameter].function.arguments
      = Object.keys(requestParameters).filter(key => requestParameters[key])
      return {
        microserviceMapping: microserviceMapping
      }
    })
  }

  handleCode = value => {
    this.setState(state => {            
      var microserviceMapping = {...state.microserviceMapping}
      microserviceMapping.mappings[state.parameter].function.code = value
      return {
        microserviceMapping: microserviceMapping
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if(event.target.name === 'submit') {
      axios.post(config.get('host_url') + config.get('routes.updateMapping'), {
        microserviceMapping: this.state.microserviceMapping,
        requestedMicroserviceName: this.state.requestedMicroservice.title
      }).then(res => {
        console.log('Mapping has been updated.')
      })
      .catch(error => {
        console.log(error)
        alert('Error in sending the request!!!')
      })        
    } else if(event.target.name === 'cancel'){
      console.log('Process cancelled.')
      this.setState({
          microserviceMapping: this.state.originalMapping
      })
    }
  }

  // TODO: standardize the null-none correspondences in select menus
  render() {
    var { microserviceMapping, parameter, mapping, requestParameters, 
      allMappings, requestedMicroservice, templates } = this.state
    if(microserviceMapping && requestedMicroservice && 
      templates && allMappings) {
      return (
        <Container>
            <Row>
              <Col sm='auto' style={{height: "80%", overflowY: 'auto'}}> 
                {microserviceMapping && <h4> Existing's <br/> Parameters </h4>}
                {
                  microserviceMapping && 
                  <ParamList 
                    paramList = {microserviceMapping.parameters} 
                    selected = {{[parameter]: true}}
                    color = "primary"
                    onClick = {this.selectParam}
                  />
                }
            </Col>
            <Col sm='auto' style={{height: "80%", overflowY: 'auto'}}> 
                {parameter && <h4> Associated Mapping </h4>}
                {
                  parameter && 
                  <MappingSelection 
                    allMappings = {allMappings} 
                    associatedMapping 
                    = {microserviceMapping.mappings[parameter]}
                    handleChange = {this.selectMapping }
                  />
                }
            </Col>
            <Col style={{height: "80%", overflowY: 'auto'}}>
                {mapping.subType && <h4> Attributes </h4>}
                {
                  mapping.subType && 
                  <MappingAttributes
                    microserviceMapping 
                    = {microserviceMapping.mappings[parameter]} 
                    requestedMicroservice = {requestedMicroservice}
                    templates = {templates}
                    handleName = {this.handleName}
                    handleArguments = {this.handleArguments}
                    handleCode = {this.handleCode}
                  />
                }
            </Col>
            <Col sm='auto' style={{height: "80%", overflowY: 'auto'}}> 
                {requestedMicroservice && <h4> Requested's<br/> Arguments </h4>}
                {
                  requestedMicroservice && 
                  <ParamList 
                    paramList = {requestedMicroservice.params} 
                    selected = {requestParameters}
                    color = "dark"
                    onClick = {this.handleArguments}
                  />
                }
            </Col>
          </Row>
          <hr/>
          <Row>
            <Col md={{offset: 8}}>
              <ButtonGroup>
                <Button 
                  variant='outline-primary' 
                  size='md' 
                  name='submit' 
                  onClick={this.handleSubmit}
                  > 
                  Submit 
                </Button>
                <Button 
                  variant='outline-secondary' 
                  size='md' 
                  name='cancel' 
                  onClick={this.handleSubmit}
                  > 
                  Cancel 
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Container>
      )
    } else {
      return (
        <h3 className="text-center"> 
          <Spinner animation="border" variant="primary" />
        </h3>
      )
    }
  }
}

export default ServiceMapping
