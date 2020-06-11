import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business';

class BusinessList extends React.Component {
  searchResults() {
    if (this.props.invalidSearch) {
      return <div> No results found</div>
    }
  }

  render() {
    return (
      <div>
        {this.searchResults()}
        {
          this.props.businesses.length > 0 ?
            <div>
              <h2> Displaying {this.props.businesses.length} results for {this.props.term} in {this.props.location} </h2>
              <div className="BusinessList">
                {this.props.businesses.map(business => {
                  return <Business key={business.id} business={business}/>
                 })}
               </div>
            </div> :
            <div>{}</div>
        }
      </div>
    );
  }
}

export default BusinessList;