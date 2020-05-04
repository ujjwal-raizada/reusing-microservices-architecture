import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import InitConfig from "./InitConfig";

InitConfig(false);
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
