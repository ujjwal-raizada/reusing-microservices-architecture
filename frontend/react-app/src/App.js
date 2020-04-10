import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ServiceMapping from './components/ServiceMapping'
import Microservices from './components/microservices.js' ;
import Combologin from './components/login/comblogin.jsx';
import NotFound from './components/NotFound'
import Home from './components/Home.jsx';

function App() {
  return (
    <Router>
				<Switch>
					<Route exact path = "/" component = {Home} />
          <Route exact path = '/microservices' component = {Microservices} />
          <Route exact path = '/login' component = {Combologin} />
          <Route exact path = '/mapping' component = {ServiceMapping} />
          <Route exact path = '/home'    component = {Home}  />
          <Route component = {NotFound} />
				</Switch>
    </Router>  
  );
}

export default App;
