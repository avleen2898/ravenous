import React from 'react';
import logo from '../../logo.svg';
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
  }

  searchYelp(term, location, sortBy) {
    Yelp.search(term, location, sortBy).then(businesses => {
      if (!businesses) {
        this.setState({invalidSearch: true});
        return;
      }
      this.setState({businesses: businesses, term: term, location: location, invalidSearch: false});
    });
  }

  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchYelp={this.searchYelp} />
        <BusinessList businesses={this.state.businesses} term={this.state.term} location={this.state.location} invalidSearch={this.state.invalidSearch} />
      </div>
    );
  }
}

export default App;
