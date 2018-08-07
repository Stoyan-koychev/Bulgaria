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

    // updateContent = () => {
    //     const wrapper = document.querySelector('.info-holder');
    //     wrapper.appendChild(this.state.content);
    // }

  render() {  
    return (
      <div className='info-modal'>
        <div className='modal-head'>
            <h3>{ this.props.name.city_name }</h3>
            <button className='close' onClick={ this.props.closeModal }>
                Hide
            </button>
        </div>
        <div className='info-holder' dangerouslySetInnerHTML={{__html: this.props.data}}></div>
      </div>
    );
  }
}

export default InfoModal;