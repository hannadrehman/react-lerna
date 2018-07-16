import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { TimePicker } from 'material-ui-pickers';

import './TimePicker.styles.scss';

class BasicTimePicker extends React.Component {
  static propTypes = {
    outputFormat: PropTypes.string,
    onTimeSelect: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    outputFormat: 'hh:mm A',
    className: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedTime: moment(),
    };
  }

  componentDidMount() {
    this.returnTimeSelected();
  }

  handleTimeChange = (Time) => {
    this.setState(
      prevState => ({
        ...prevState,
        selectedTime: Time,
      }),
      () => {
        this.returnTimeSelected();
      },
    );
  };

  returnTimeSelected = () => {
    const { outputFormat, onTimeSelect } = this.props;
    const { selectedTime } = this.state;
    const date = !outputFormat
      ? 'hh:mm A'
      : outputFormat;
    onTimeSelect(selectedTime.format(date));
  };

  render() {
    const { label, className } = this.props;
    const { selectedTime } = this.state;
    return (
      <Fragment>
        <div className={`timepicker timepicker__wrapper ${className}`}>
          <TimePicker
            autoOk
            label={label}
            value={selectedTime}
            onChange={this.handleTimeChange}
          />
        </div>
      </Fragment>
    );
  }
}

export default BasicTimePicker;
