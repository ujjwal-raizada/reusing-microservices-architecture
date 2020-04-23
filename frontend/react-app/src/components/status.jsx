import React,{ Component } from 'react' ;
import axios from 'axios' ; 
import Header from './Header' ;  
import Table from 'react-bootstrap/Table' ; 
import config from 'react-global-configuration'


class Status extends Component {

    state = {
        loadStatus:false 
    }

    componentDidMount(){
        const url = config.get('host_url') + config.get('routes.allRequested')

        axios.get(url)
        .then( res => {
            this.setState({
                requests:res.data.micros,
                loadStatus:true
            });
            
        })
    }

    displayStatus(){
        var requests = this.state.requests ;
        var rows = []
        for(var index=0 ; index < requests.length ; index++){
            rows.push(<tr key={requests[index]._id}>
                <td> {index+2} </td>
                <td> {requests[index].title} </td>
                <td>Not Assigned</td>
                <td><p style={{color:'red'}}>Pending</p></td>
            </tr>)

        }
        return rows ; 
    }

    render(){

        if(this.state.loadStatus){
                return (
                    <div className="home-wrap">
                        <Header/>
                        <center><h1><p style = {{color:'Black'}}>Status table</p></h1></center>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th><p style = {{color:'LightGrey'}}>Sr.no</p> </th>
                                    <th><p style = {{color:'LightSlateGrey'}}>Requested Microservice</p></th>
                                    <th><p style = {{color:'LightSlateGrey'}}>Developer</p></th>
                                    <th><p style = {{color:'LightSlateGrey'}}>Status</p></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Login</td>
                                    <td><p style = {{color:'Aqua'}}>@rakesh_maurya</p></td>
                                    <td><p style = {{color:'LawnGreen'}}> Complete</p></td>
                                </tr>
                                {this.displayStatus()}
                            </tbody>
                        </Table>
                    </div>
                )

        }else{
            return(
                <Header/>
            )
        }


    }

}

export default Status;