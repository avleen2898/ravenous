import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      location: '',
      sortBy: 'best_match'
    };
    this.sortByOptions = {
      'Best Match': 'best_match',
      'Highest Rated': 'rating',
      'Most Reviewed': 'review_count'
    };
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeySearch = this.handleKeySearch.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeySearch);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeySearch);
  }

  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return 'active';
    } else {
      return '';
    }
  }

  handleSortByChange(sortByOption) {
    let newState = this.state;
    newState.sortBy = sortByOption;
    this.setState(newState);
  }

  handleTermChange(e) {
    document.querySelector('.SearchBar-invalid').style.display = 'none';
    this.setState({term: e.target.value});
  }

  handleLocationChange(e) {
    document.querySelector('.SearchBar-invalid').style.display = 'none';
    this.setState({location: e.target.value});
  }

  handleSearch(e) {
    e.preventDefault();
    if (this.state.term === '' || this.state.location === '') {
      document.querySelector('.SearchBar-invalid').style.display = 'block';
      this.handleBusinessesUpdate();
      return;
    }
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    this.setState({term: '', location: ''});
  }

  handleKeySearch(e) {
    if (e.keyCode === 13) {
      this.handleSearch(e);
    }
  }

  handleBusinessesUpdate() {
    this.props.updateBusinesses();
  }

  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map((sortByOption) => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return <li key={sortByOptionValue} className={this.getSortByClass(sortByOptionValue)} onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>{sortByOption}</li>;
    });
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            {this.renderSortByOptions()}
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input placeholder="Search Businesses" value={this.state.term} onChange={this.handleTermChange} required/>
          <input placeholder="Where?" value={this.state.location} onChange={this.handleLocationChange} required/>
        </div>
        <div className="SearchBar-invalid">
          Please fill out both fields to get relevant results
        </div>
        <div className="SearchBar-submit">
          <a onClick={this.handleSearch}>Let's Go!</a>
        </div>
      </div>
    );
  }
}

export default SearchBar;