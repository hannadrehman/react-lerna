import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';

const Icons = ({
  className, theme, icon, onClick,
}) => (
  <Icon
    className={className}
    color={theme}
    onClick={onClick}
  >
    {icon}
  </Icon>
);
Icons.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.string,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
Icons.defaultProps = {
  className: '',
  theme: 'primary',
  onClick: () => {},
};
export default Icons;
