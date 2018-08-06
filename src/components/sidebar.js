import React, { Component } from 'react';

class Sidebar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      query: ''
    }

    this.updateQuery = this.updateQuery.bind(this);
  }

  updateQuery = (query) => {
    this.setState({ query: query });
  }

  render() {
    return (
      <div className='sidebar'>
      <h3>Fint address</h3>
        <div className='search-field'>
          <input
            className='search-text'
            tabIndex='1'
            type='text'
            placeholder='Search places'
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
            />
          <button
            className='search-text-value'
            onClick={() => this.props.changeLocation(this.state.query)}
          >
            Search
          </button>
        </div>
        <ul className='sidebar-places'>
          {this.props.names.map(obj => (
            <li className='sidebar-list' key={obj.id}> {obj.city_name} </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
