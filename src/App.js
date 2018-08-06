import React, { Component } from 'react';
//Location Data
import * as LocationsData from './data/locations.json'
//Sidebar
import Sidebar from './components/sidebar.js';
import './components/sidebar.css';
//Google Map
import GoogleMaps from './components/map.js'
import './App.css';

class App extends Component {
constructor(props) {
  super(props);
  this.state = {
    locations: []
  }
}

componentDidMount() {
  this.addLocations();
}

addLocations = () => {
  let locations = [];
  locations.push(...LocationsData);
  this.setState({locations: locations})
}

  render() {
    return (
      <div>
        <Sidebar names={this.state.locations}/>
        <GoogleMaps locations={this.state.locations}/>
      </div>
    );
  }
}

export default App;
