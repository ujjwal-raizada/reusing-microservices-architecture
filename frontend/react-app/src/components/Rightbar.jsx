import React, { Component } from 'react';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import axios from 'axios';
import './sidebar.css' ;
import config from 'react-global-configuration'

class Rightbar extends Component {
    state = { 
        loadStatus:false 
     }

    componentWillMount(){
        const url = config.get('host_url') + config.get('routes.allRequested')

        axios.get(url).then(res=>{
          this.setState({micros:res.data.micros,loadStatus:true});
        })
    }

    render() { 
        var micros = this.state.micros ;
        // console.log(this.props.renderMicroserviceB);
        if(this.state.loadStatus === true){
            micros = micros.map(function(micro,index){
              return(
                  <NavItem key= {micro._id}  eventkey = {micro._id} onClick = {() => this.props.renderMicroserviceB(micro._id)}>
                      <NavText>
                          {micro.title}
                      </NavText>
                  </NavItem>
              )
            }.bind(this));
          }

        return ( 
            <div className="request-micro">
                <SideNav
                    disabled="true"
                    expanded="true" 
                    onSelect={(selected) => {
                        // const to = '/' + selected;
                        // if (location.pathname !== to) {
                        //     history.push(to);
                        // }

                    }} >
                    <SideNav.Toggle/>
                    <SideNav.Nav defaultSelected="Microservices">
                        <NavItem eventKey="Microservices">
                            <NavIcon>
                                <i className="fa fa-cubes" aria-hidden={true} style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                Microservices B
                            </NavText>
                            {micros}
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
            </div>
         );
    }
}

export default Rightbar; 
