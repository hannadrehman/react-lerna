import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

import './LoaderGif.styles.scss';

const LoaderGif = ({ visible }) => (
  <div className="loadergif">
    {
      visible
      && <CircularProgress />
    }
  </div>
);
LoaderGif.propTypes = {
  visible: PropTypes.bool,
};
LoaderGif.defaultProps = {
  visible: 0,
};

export default LoaderGif;
