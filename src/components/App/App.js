import React from 'react';
import './App.css';
import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import Yelp from '../../util/Yelp';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      term: '',
      location: '',
      invalidSearch: false
    };
    this.searchYelp = this.searchYelp.bind(this);
    this.updateBusinesses = this.updateBusinesses.bind(this);
  }

  searchYelp(term, location, sortBy) {
    Yelp.search(term, location, sortBy).then(businesses => {
      if (!businesses) {
        this.setState({invalidSearch: true, businesses:[]});
        return;
      }
      this.setState({businesses: businesses, term: term, location: location, invalidSearch: false});
    });
  }

  updateBusinesses() {
    this.setState({businesses: []});
  }

  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchYelp={this.searchYelp} updateBusinesses={this.updateBusinesses} />
        <BusinessList businesses={this.state.businesses} term={this.state.term} location={this.state.location} invalidSearch={this.state.invalidSearch} />
      </div>
    );
  }
}

export default App;
