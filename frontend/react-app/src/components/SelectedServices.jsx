import React, { Component } from 'react'
import { Breadcrumb, ButtonGroup, Button } from 'react-bootstrap'


class SelectedServices extends Component {
  render() {
    const { services, serviceIds } = this.props

    var selectedServices = serviceIds.map((id, index) => {
      var title = ''
      for(var service of services){
        if(service._id === id) {
          title = service.title
          break
        }
      }
      
      return(
        <Breadcrumb.Item active key={index}> {title} </Breadcrumb.Item>
      )
    })

    return (
      <Breadcrumb>
        {selectedServices}
        <ButtonGroup size="sm" className="mb-2">
          <Button 
            variant="outline-dark"
            onClick={this.props.handlePop}
            >
            Pop
          </Button>
        </ButtonGroup>
      </Breadcrumb>
    )
  }
}

export default SelectedServices
