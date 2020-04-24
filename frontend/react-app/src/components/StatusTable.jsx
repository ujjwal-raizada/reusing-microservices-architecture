import React, { Component, Fragment } from 'react'
import { Table } from 'react-bootstrap'


class StatusTable extends Component {
  
  render() {
    var rows = this.props.data.map((item, index) => (
      <tr key={index}>
        <td> {index+1} </td>
        <td> {item.title} </td>
        <td> Not Assigned </td>
        <td> <p style={{color:'red'}}> Pending </p> </td>
      </tr>
    ))

    return (
      <Fragment>
        <center>
          <h1> <p style = {{color:'Black'}}> Status table </p> </h1>
        </center>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th><p style = {{color:'LightGrey'}}> Sr.no </p> </th>
              <th><p style = {{color:'LightSlateGrey'}}> Request </p></th>
              <th><p style = {{color:'LightSlateGrey'}}> Developer </p></th>
              <th><p style = {{color:'LightSlateGrey'}}> Status </p></th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      </Fragment>      
    )
  }
}

export default StatusTable
