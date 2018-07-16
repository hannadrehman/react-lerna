import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import { debounce } from '../../../Services/utility/debounce';

import { TEXTBOX_DEBOUNCE_TIME } from '../../../Constants/elements/element.constants';

import './Textbox.styles.scss';

class Textbox extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    required: PropTypes.bool,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    multiline: PropTypes.bool,
    rows: PropTypes.string,
    defaultValue: PropTypes.string,
    className: PropTypes.string,
    helperText: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    fullWidth: PropTypes.bool,
  }

  static defaultProps = {
    type: 'text',
    required: false,
    multiline: false,
    rows: '',
    defaultValue: '',
    className: '',
    helperText: '',
    fullWidth: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      validationFailed: false,
      value: null,
    };
    // debounce to reduce useless callback calls.to the parent
    this.debounce = debounce(TEXTBOX_DEBOUNCE_TIME, this.handleDebounce);
  }

  handleChange = (ev) => {
    try {
      const { target: { value } } = ev;
      this.setState(prevState => (
        {
          ...prevState,
          value,
          validationFailed: this.validate(value),
        }
      ), () => {
        // call debounce method to prevent multiple callback calls
        this.debounce();
      });
    } catch (e) {
      this.setState(prevState => (
        {
          ...prevState,
          value: '',
        }
      ));
    }
  }

  handleDebounce = () => {
    const { onChange } = this.props;
    const { value } = this.state;
    onChange(value);
  }

  validate = (value) => {
    const { required } = this.props;
    try {
      if (required) {
        return (!value);
      }
      return false;
    } catch (e) {
      // validation fails if any exception occures
      return true;
    }
  }

  render() {
    const {
      value, validationFailed,
    } = this.state;
    const {
      fullWidth, type, defaultValue, required, id, label, multiline, rows, className, helperText,
    } = this.props;
    return (
      <div className="textbox textbox__wrapper" style={{ display: (fullWidth ? 'block' : 'inline-block') }}>
        <TextField
          type={type}
          value={(value !== null) ? value : defaultValue}
          required={required}
          error={validationFailed}
          id={id}
          label={label}
          multiline={multiline}
          rows={rows}
          className={className}
          margin="normal"
          helperText={helperText}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Textbox;
