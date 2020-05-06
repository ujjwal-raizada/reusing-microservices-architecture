import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Services from './components/Services' ;
import Requests from './components/Requests' ;
import MappingContainer from './components/MappingContainer'
import RegisterService from './components/RegisterService';
import RegisterRequest from './components/RegisterRequest';
import Status from './components/Status'
import NotFound from './components/NotFound'

function App() {
  return (
    <Router>
				<Switch>
					<Route exact path = "/" component = {Login} />
          <Route exact path = '/home' component = {Home}  />
          <Route exact path = '/login' component = {Login} />
          <Route exact path = '/register' component = {Register} />
          <Route exact path = '/services' component = {Services} />
          <Route exact path = '/requests' component = {Requests} />
          <Route exact path = '/mapping' component = {MappingContainer} />
          <Route exact path = '/register/service' component = {RegisterService}  />
          <Route exact path = '/register/request' component = {RegisterRequest}  />
          <Route exact path = '/status' component={Status} />
          <Route component = {NotFound} />
				</Switch>
    </Router>  
  );
}

export default App;
