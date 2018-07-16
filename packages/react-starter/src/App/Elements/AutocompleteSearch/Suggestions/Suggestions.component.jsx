import React from 'react';
import PropTypes from 'prop-types';
import SimpleList from '../../SimpleList/SimpleList.component';

const Suggestions = ({ options, onClick }) => (
  <div className="suggestions suggestions__wrapper">
    <SimpleList list={options} onClick={onClick} />
  </div>
);
Suggestions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
    value: PropTypes.string,
  })),
  onClick: PropTypes.func,
};
Suggestions.defaultProps = {
  options: [],
  onClick: () => {},
};
export default Suggestions;
