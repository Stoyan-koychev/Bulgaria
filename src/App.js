import React, { Component } from 'react';
//Location Data
import * as LocationsData from './data/locations.json'
//Sidebar
import Sidebar from './components/sidebar.js';
import './components/sidebar.css';
//Info Modal
import InfoModal from './components/info_modal.js';
import './components/infomodal.css';
//Google Map
import GoogleMaps from './components/map.js'
import './App.css';

import escapeRegExp from 'escape-string-regexp';

class App extends Component {
constructor(props) {
  super(props);
  this.state = {
    query: '',
    locations: [],
    isModalOpen: false,
    selectedCity: {},
    wikiData: ''
  }
  this.updateQuery = this.updateQuery.bind(this);
  this.openModal = this.openModal.bind(this);
  this.closeModal = this.closeModal.bind(this);
  this.wikipediaData = this.wikipediaData.bind(this);
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
  this.setState({locations: locations});
}

openModal = (object) => {
  if(this.state.selectedCity.length === undefined){
    this.setState({ selectedCity: object });
    this.setState({ isModalOpen: true });
  }
}

wikipediaData = (query) => {
  let info;
  let wikiLink = `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&titles=${query}`;
  fetch(wikiLink).then(res => {
    return res.json()
  }).then(data => {
    info = data.query.pages[Object.keys(data.query.pages)[0]].extract;
    this.setState({ wikiData: info });
  }).catch(error => {
    console.log('There was errow fetchind data from wiki '+ error)
  })
}

closeModal = () => {
  this.setState({ isModalOpen: false });
}

  render() {
    return (
      <div>
        {(this.state.isModalOpen) && 
          <InfoModal 
            name={this.state.selectedCity}
            closeModal={ this.closeModal }
            wikipediaData={ this.wikipediaData }
            data={ this.state.wikiData }
          />
        }
        <Sidebar 
          locations={ this.state.locations }
          updateQuery={ this.updateQuery }
          openModal={ this.openModal }
        />
        <GoogleMaps 
          locations={ this.state.locations }
          openModal={ this.openModal }
        />
      </div>
    );
  }
}

export default App;
