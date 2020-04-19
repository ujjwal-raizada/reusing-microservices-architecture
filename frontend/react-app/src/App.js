import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/Home';
import Combologin from './components/login/comblogin';
import Microservices from './components/microservices' ;
import MappingContainer from './components/MappingContainer'
import RegisterService from './components/RegisterService';
import NotFound from './components/NotFound'

function App() {
  return (
    <Router>
				<Switch>
					<Route exact path = "/" component = {Home} />
          <Route exact path = '/home' component = {Home}  />
          <Route exact path = '/login' component = {Combologin} />
          <Route exact path = '/microservices' component = {Microservices} />
          <Route exact path = '/mapping' component = {MappingContainer} />
          <Route exact path = '/register/service' component = {RegisterService}  />
          <Route component = {NotFound} />
				</Switch>
    </Router>  
  );
}

export default App;
