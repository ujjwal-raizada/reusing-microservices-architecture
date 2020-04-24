import React, { Component, Fragment } from 'react'
import { Container } from 'react-bootstrap'
import config from 'react-global-configuration'
import axios from 'axios'
import Header from './Header'
import StatusTable from './StatusTable'


class Status extends Component {

  state = {
    requests: null 
  }

  componentDidMount() {
    const url = config.get('host_url') + config.get('routes.allRequested')

    axios.get(url)
    .then(res => {
      this.setState({
        requests: res.data.micros
      })        
    })
    .catch(console.log)
  }

  render(){
    var { requests } = this.state

    return (
      <Fragment>
        <Header/>
        { requests && (
            <Container>
              <StatusTable data={requests}/>
            </Container>
          )
        }
      </Fragment>
    )
  }
}

export default Status
