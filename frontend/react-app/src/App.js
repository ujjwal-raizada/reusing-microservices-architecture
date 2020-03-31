import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom' ;
import Microservices from './components/microservices.js' ;
import Combologin from './components/login/comblogin.jsx';
import ServiceMapping from './components/ServiceMapping' ;
import Home from './components/Home.jsx';
import NotFound from './components/NotFound'
import { Redirect } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      {/* <Switch> */}
      <Route exact path = '/microservices' component={Microservices} />
      <Route exact path = "/" component = {Combologin} />
      <Route exact path = '/login' component = {Combologin} />
      <Route exact path = '/mapping' component = {ServiceMapping} />
      <Route exact path = '/home'    component = {Home}  />
      <Route component = {NotFound} />
      {/* </Switch> */}
    </BrowserRouter>
  
  );
}

export default App;
