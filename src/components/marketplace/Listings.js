import React from 'react';
import PropTypes from 'prop-types';
import Listing from './Listing';

const Listings = ({ listings }) => {

  return (
    <div className="posts">
      {listings.map((listing) => <Listing listing={listing} key={listing.id} />)}
    </div>
  );
};

Listings.propTypes = {
  listings: PropTypes.array,
};

export default Listings;
