import React, { Component } from 'react';
import {Map, GoogleMapReact, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';



export class GoogleMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: []
    }
  }

  savePoints = () => {
    this.props.locations.map( obj => {
      let points = [];
      points.push(obj.position);
      this.setState({ points });
    });
  }

  render () {

    let bounds = new this.props.google.maps.LatLngBounds();
    for (let i = 0; i < this.state.points.length; i++) {
      bounds.extend(this.state.points[i])
    }

    return (
      <Map 
        google={this.props.google} 
        initialCenter={{
          lat: 42.9184297,
          lng: 23.723127
        }} 
        zoom={7}
        bounds={bounds}
      >

        {this.props.locations.map( obj => (
        <Marker 
          key={obj.id}
          position={obj.position}
          name={obj.name} 
        />
        ))} 
          
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBu8b4ogipDKjSlVRJ4bSTdJS1b8sQRO0Q')
})(GoogleMaps)
