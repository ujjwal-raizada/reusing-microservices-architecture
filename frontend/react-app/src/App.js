import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from './components/Homepage'
import ServiceMapping from './components/ServiceMapping'
import Microservices from './components/microservices.js' ;
import Combologin from './components/login/comblogin.jsx';
import NotFound from './components/NotFound'

function App() {
  return (
    <Router>
				<Switch>
					<Route exact path = "/" component = {Homepage} />
          <Route exact path = '/microservices' component = {Microservices} />
          <Route exact path = '/login' component = {Combologin} />
          <Route exact path = '/mapping' component = {ServiceMapping} />
          <Route component = {NotFound} />
				</Switch>
    </Router>  
  );
}

export default App;
