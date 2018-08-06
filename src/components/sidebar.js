import React, { Component } from 'react';

class Sidebar extends Component {
  render() {
    return (
      <div className='sidebar'>
      <h3>Find City</h3>
        <div className='search-field'>
          <input
            className='search-text'
            tabIndex='1'
            type='text'
            placeholder='Search For City'
            onChange={(event) => this.props.updateQuery(event.target.value)}
            />
        </div>
        <ul className='sidebar-places'>
          {this.props.locations.map( obj => (
            <li className='sidebar-list' key={obj.id}> {obj.city_name} </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
