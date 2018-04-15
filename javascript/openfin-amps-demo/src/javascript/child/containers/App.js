import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
//import Toolbar from './toolbar/Toolbar';
//import SideBar from './sidebars/Sidebar';
//import Showcase from './showcase/Showcase';
//import Version from '../components/version/Version';
//import { truncate } from '../services/formatters';
//import { appSelector as mapStateToProps } from '../selectors/selectors';

//import noFavourites from '../assets/png/no_favourites.png';

//import windowStateShape from '../propTypeShapes/windowState';
console.log("doing sth");
class App extends React.Component {

  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}


export default App;