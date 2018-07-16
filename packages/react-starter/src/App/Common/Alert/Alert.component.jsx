import React from 'react';
import PropTypes from 'prop-types';
import { ALERT_TYPES } from '../../../Constants/elements/element.constants';

import './Alert.styles.scss';

const Alert = ({ message, type, visible }) => (
  <div className="alert">
    {
    visible
    && (
    <div className={`alert__wrapper alert--${type.toLowerCase()}`}>
      <p>
        {message}
      </p>
    </div>
    )
  }
  </div>

);
Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
  visible: PropTypes.bool.isRequired,

};
Alert.defaultProps = {
  type: ALERT_TYPES.DANGER,
};


export default Alert;
