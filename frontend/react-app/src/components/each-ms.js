import React , {Component} from 'react'
import {Link} from 'react-router-dom';
import './view_ms.css'
import axios from 'axios'
import config from 'react-global-configuration'

class Each_MS extends Component{
  state={
    micro:{title:"MS"},
    loadStatus:false
  }

  componentWillMount(){
    
    const url = config.get('host_url') + config.get('routes.existingById')

    axios.post(url,{micro_id:this.props.micro_id}).then(res => {
      console.log("Data reached")
      this.setState({micro:res.data.micro,loadStatus:true})
    })
  }
  render(){
   
    var micro = this.state.micro ;
    var keywords = micro.keywords ;
    var tech_stack = micro.tech_stack ;
    var params = micro.params;
    if(this.state.loadStatus === true){

    keywords = keywords.map(function(key,index){
      return(<div className="mkey" key={index}><p>{key}</p></div>)
    });
    tech_stack = tech_stack.map(function(tech,index){
      return(<div className="mtech" key={index}><p>{tech}</p></div>)
    })

    params = params.map(function(key,index){
    return ( <div className="mtech"  key={index}><p>{key}</p></div>)
    })
  }
    return(
        <div className='each-micro each-ms-comp' id={"each-microid"}>
            <div className="em-1">
            <h3 className='micro-name'>{micro.title}</h3>
            <div className="micro_keys">
              {keywords}
            </div>
            <h3 className='ts-title'>Params</h3>
            <div className="tech_stack">
              {params}
            </div>
            <h3 className="ts-title">Tech Stack</h3>
            <div className="tech_stack">
                {tech_stack}
            </div>
            <p className="micro-doc"><b>Documentation: </b>{micro.documentation}</p>
            </div>
            <div>
                <Link to={{pathname:"/microservices",state:{micro_id:micro._id}}}>
                  <button className="btn btn-success">Link params</button>
                </Link>
            </div>
        </div>
    )
  }
 

}

export default Each_MS
