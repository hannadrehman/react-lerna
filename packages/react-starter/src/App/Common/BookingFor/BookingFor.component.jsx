import React from 'react';
import PropTypes from 'prop-types';

import './BookingFor.styles.scss';

const BookingFor = ({ userEmail }) => (
  <div className="bookingfor bookingfor__wrapper">
    <p>
      Booking for :
      {' '}
      <em>
        {userEmail}
      </em>
    </p>
  </div>
);
BookingFor.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default BookingFor;
