import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';



export class GoogleMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: []
    }
  }

  componentDidMount() {
    this.setState({ locations: this.props.locations })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({locations: nextProps.locations})
  }

  render () {
    console.log("MAP ")
    console.log(this.state.locations)
    return (
      <Map 
        google={this.props.google} 
        initialCenter={{
          lat: 42.9184297,
          lng: 23.723127
        }} 
        zoom={7}
      >

      {this.state.locations.map( obj => (
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
