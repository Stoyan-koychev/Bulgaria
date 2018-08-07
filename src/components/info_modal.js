import React, { Component } from 'react';

class InfoModal extends Component {
  render() {
    return (
      <div className='info-modal'>
        <div className='modal-head'>
            <h3>{ this.props.name.city_name }</h3>
            <button className='close' onClick={ this.props.closeModal }>
                Hide
            </button>
        </div>
      </div>
    );
  }
}

export default InfoModal;