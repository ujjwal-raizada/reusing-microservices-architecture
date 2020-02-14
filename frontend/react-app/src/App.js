import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom' ;
import Microservices from './components/microservices.js' ;
import Combologin from './components/login/comblogin.jsx';
import ServiceMapping from './components/ServiceMapping' ;
import logo from './logo.svg';
// import './App.css'; 


function App() {
  return (
    <BrowserRouter>
      {/* <div> */}
      <Route exact path = '/microservices' component={Microservices} />
      <Route exact path = '/login' component = {Combologin} />
      {/* </div> */}
    </BrowserRouter>
  
  );
}

export default App;
