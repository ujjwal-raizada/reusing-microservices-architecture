import React , {Component} from 'react'
import Each_MS from './each-ms.js'
import './view_ms.css'
import axios from 'axios'
import config from 'react-global-configuration'

class Microservices extends Component{
  state={
    loadStatus:false 
  }
  componentWillMount(){

    const url = config.get('host_url') + config.get('routes. allExisting')
    axios.get(url).then(res=>{
      this.setState({micros:res.data.micros,loadStatus:true});
      console.log(res.data.micros);
    })
  }
  render(){
    var micros = this.state.micros ;
    if(this.state.loadStatus === true){
    micros = micros.map(function(micro,index){
      return(
          <Each_MS key= {micro._id} micro_id={micro._id} link={false}/>
      )
    }.bind(this));
  }
    return(
      <div className="wrap">
          <h1 className="title">List of Microservices</h1>
          <div className="content">
            {micros}
          </div>
      </div>
    )
  }

}
export default Microservices
