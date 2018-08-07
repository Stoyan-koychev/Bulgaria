import React, { Component } from 'react';

class Sidebar extends Component {
  render() {
    return (
      <div className={`sidebar ${this.props.isSidebarOpen ? 'show' : 'hide' }`}>
      <div className='sidebar-title'>
        <h3>Find City</h3>
        <button 
          onClick={() => this.props.toggleSidebar()}
          aria-label='toggle sidebar'
          tabIndex='1'>
          {`${this.props.isSidebarOpen ? 'Hide' : 'Show' }`}
        </button>
      </div>
        <div className='search-field'>
          <input
            className='search-text'
            tabIndex={this.props.isSidebarOpen ? 0 : -1}
            aria-label='Search'
            type='text'
            placeholder='Search For City'
            onChange={(event) => this.props.updateQuery(event.target.value)}
            />
        </div>
        <ul className='sidebar-places'>
          {this.props.locations.map( obj => (
            <li className='sidebar-list' 
              key={obj.id}
              tabIndex={this.props.isSidebarOpen ? 0 : -1}
              aria-label={obj.city_name}
              onClick={() => (this.props.openModal(obj))}
            > 
              {obj.city_name} 
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
