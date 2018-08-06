import React, { Component } from 'react';
//Location Data
import * as LocationsData from './data/locations.json'
//Sidebar
import Sidebar from './components/sidebar.js';
import './components/sidebar.css';
//Google Map
import GoogleMaps from './components/map.js'
import './App.css';

import escapeRegExp from 'escape-string-regexp';

class App extends Component {
constructor(props) {
  super(props);
  this.state = {
    query: '',
    locations: []
  }
  this.updateQuery = this.updateQuery.bind(this);
}

updateQuery = (query) => {
  this.setState({ query })
  if(query){
    let locations = [];
    let filtered = [];
    let expression =  new RegExp(escapeRegExp(this.state.query), 'i');
    locations.push(...LocationsData);

    locations.map( location => {
      if(location.city_name.search(expression) !== -1){
        filtered.push(location);
        this.setState({ locations: filtered });
      }
    })
  }else{
    this.addLocations();
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
        <Sidebar 
          locations={ this.state.locations }
          updateQuery={ this.updateQuery }
        />
        <GoogleMaps 
          locations={ this.state.locations } 
        />
      </div>
    );
  }
}

export default App;
