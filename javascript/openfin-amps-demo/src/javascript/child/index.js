import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import App from './containers/App';
const rootElement = document.getElementById('app');
//import WindowStateService from './services/WindowStateService';
//import currentWindowService from './services/currentWindowService';

class Main extends React.Component {
  render() {return <App/>, rootElement} 
  }

console.log("doing sth");

