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
    isSidebarOpen: true,
    isMobile: false,
    selectedCity: {},
    wikiData: '',
    isGoogleLoaded: true,
    isWikiLoaded: true
  }
  this.updateQuery = this.updateQuery.bind(this);
  this.openModal = this.openModal.bind(this);
  this.closeModal = this.closeModal.bind(this);
  this.wikipediaData = this.wikipediaData.bind(this);
  this.toggleSidebar = this.toggleSidebar.bind(this);
  this.checkMobile = this.checkMobile.bind(this);
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
  this.checkMobile();
  this.isMapsLoaded();
}

addLocations = () => {
  let locations = [];
  locations.push(...LocationsData);
  this.setState({locations: locations});
}

openModal = object => {
  this.setState({ 
    selectedCity: object,
    isModalOpen: true
   });
}

wikipediaData = (query) => {
  let info;
  let wikiLink = `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&titles=${query}`;
  fetch(wikiLink).then(res => {
    return res.json()
  }).then(data => {
    info = data.query.pages[Object.keys(data.query.pages)[0]].extract;
    this.setState({ wikiData: info });
    this.setState({ isWikiLoaded: true });
  }).catch(error => {
    info = '<h2>Something went wrong</h2><p>please try again later</p>'
    this.setState({ wikiData: info });
    this.setState({ isWikiLoaded: false });
    console.log('There was errow fetchind data from wiki '+ error);
  })
}

closeModal = () => {
  this.setState({ 
    selectedCity: {},
    isModalOpen: false }
  );
}

toggleSidebar = () => {
  this.setState(prevState => ({
    isSidebarOpen: !prevState.isSidebarOpen
  }))
}

checkMobile = () => {
  let width = window.innerWidth;
  if(width < 650){
    this.setState(prevState => ({
      isMobile: !prevState.isMobile
    }))
  }
}

isMapsLoaded = () => {
  setTimeout(() => {
    const map = document.querySelector('iframe');
    if (!map) {
      this.setState({ isGoogleLoaded: false })
    }
  }, 4000);
}

  render() {
    return (
      <div>
        <Sidebar
          locations={ this.state.locations }
          updateQuery={ this.updateQuery }
          openModal={ this.openModal }
          isSidebarOpen={ this.state.isSidebarOpen }
          toggleSidebar={ this.toggleSidebar }
        />

        {(this.state.isModalOpen) && 
          <InfoModal 
            name={this.state.selectedCity}
            closeModal={ this.closeModal }
            wikipediaData={ this.wikipediaData }
            data={ this.state.wikiData }
            isModalOpen={ this.state.isModalOpen }
          />
        }

        {this.state.isGoogleLoaded ? (
          <GoogleMaps 
            locations={ this.state.locations }
            openModal={ this.openModal }
            selectedCity={this.state.selectedCity}
          />
        ) : (
          <div className="isNotLoaded">
            <h2>Something went wrong</h2>
            <p>please try again later</p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
