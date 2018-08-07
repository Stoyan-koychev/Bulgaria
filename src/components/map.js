import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';



export class GoogleMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      isOpen: true
    }
  }

  componentDidMount() {
    this.setState({ locations: this.props.locations })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({locations: nextProps.locations})
  }

  toggle = () => {
    this.setState({isOpen: !this.state.isOpen}) 
  }

  render () {
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
          title={obj.city_name}
          key={obj.id}
          position={obj.position}
          name={obj.city_name}
          onClick={() => {this.props.openModal(obj)}}
        />
      ))} 
          
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBu8b4ogipDKjSlVRJ4bSTdJS1b8sQRO0Q')
})(GoogleMaps)
