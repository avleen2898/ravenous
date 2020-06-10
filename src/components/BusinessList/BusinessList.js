import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business';

class BusinessList extends React.Component {
  render() {
    return (
      <div>
        {this.props.businesses.length > 0 ?
          <h2> Displaying {this.props.businesses.length} results for </h2> :
          <h2>{}</h2>
        }
        <div className="BusinessList">
          {this.props.businesses.map(business => {
            return <Business key={business.id} business={business} />
          })}
        </div>
      </div>
    );
  }
}

export default BusinessList;