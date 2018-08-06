import React, { Component } from 'react';
import {Map, GoogleMapReact, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';



export class GoogleMaps extends Component {
  render () {
    return (
      <Map google={this.props.google} zoom={12}>

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
