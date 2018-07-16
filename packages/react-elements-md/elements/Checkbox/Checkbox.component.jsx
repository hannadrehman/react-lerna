import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import './Checkbox.styles.scss';

class AppCheckbox extends React.Component {
  static propTypes={
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    className: PropTypes.string,
    disableRipple: PropTypes.bool,
    label: PropTypes.string,
    theme: PropTypes.string,
  }

  static defaultProps ={
    checked: false,
    className: '',
    disableRipple: true,
    label: '',
    theme: 'primary',
  }

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || false,
      shadowChecked: false, // eslint-disable-line
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.checked !== state.shadowChecked) {
      return {
        ...state,
        checked: props.checked || false,
        shadowChecked: props.checked,
      };
    }
    return null;
  }

  handleChange = () => {
    this.setState(prevState => (
      {
        ...prevState,
        checked: !prevState.checked,
      }
    ), () => {
      const { onChange, id } = this.props;
      const { checked } = this.state;
      onChange({ id, value: checked });
    });
  }

  render() {
    const {
      id, disableRipple, className, theme, label,
    } = this.props;
    const { checked } = this.state;
    return (
      <div className="checkbox checkbox__wrapper">
        <FormControlLabel
          control={(
            <Checkbox
              id={id}
              checked={checked}
              tabIndex={-1}
              disableRipple={disableRipple}
              onChange={this.handleChange}
              className={className}
              color={theme}
            />
          )}
          label={label}
        />
      </div>
    );
  }
}

export default AppCheckbox;
