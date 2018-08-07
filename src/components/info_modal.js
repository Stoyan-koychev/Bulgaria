import React, { Component } from 'react';

class InfoModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: ''
        }
    }

    componentDidMount() {
        this.props.wikipediaData(this.props.name.city_name);
    }

    componentWillUpdate() {
        this.props.wikipediaData(this.props.name.city_name);
    }

  render() {  
    return (
      <div className='info-modal'>
        <div className='modal-head'>
            <h1 className='info-title'>{ this.props.name.city_name }</h1>
            <button className='close' onClick={ this.props.closeModal }>
                Close
            </button>
        </div>
        <div className='info-holder' dangerouslySetInnerHTML={{__html: this.props.data}}></div>
      </div>
    );
  }
}

export default InfoModal;