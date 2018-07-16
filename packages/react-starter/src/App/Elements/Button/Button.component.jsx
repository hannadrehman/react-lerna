import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import './Button.styles.scss';

const AppButton = ({
  theme, className, disabled, onClick, variant, ariaLabel, text, meta,
}) => (
  <div className="button button__wrapper">
    <Button
      color={theme}
      className={className}
      disabled={disabled}
      onClick={onClick}
      variant={variant}
      aria-label={ariaLabel}
      data-meta={meta}
    >
      {text}
    </Button>
  </div>
);
AppButton.defaultProps = {
  theme: 'primary',
  className: '',
  disabled: false,
  variant: 'text',
  ariaLabel: '',
  meta: '',
};
AppButton.propTypes = {
  theme: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  ariaLabel: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  meta: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default AppButton;
