import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DatePicker } from 'material-ui-pickers';

import './DatePicker.styles.scss';

class BasicDatePicker extends React.Component {
  static propTypes = {
    outputFormat: PropTypes.string,
    onDateSelect: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    disablePast: PropTypes.bool,

  }

  static defaultProps = {
    outputFormat: 'DD/MM/YYYY',
    className: '',
    disablePast: true,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment(),
    };
  }

  componentDidMount() {
    this.returnDateSelected();
  }

  handleDateChange = (date) => {
    this.setState(prevState => (
      {
        ...prevState,
        selectedDate: date,
      }
    ), () => {
      this.returnDateSelected();
    });
  }

  returnDateSelected =() => {
    const { outputFormat, onDateSelect } = this.props;
    const { selectedDate } = this.state;
    const date = (!outputFormat) ? 'DD/MM/YYYY' : outputFormat;
    onDateSelect(selectedDate.format(date));
  }

  render() {
    const { className, label, disablePast } = this.props;
    const { selectedDate } = this.state;
    return (
      <Fragment>
        <div className={`datepicker datepicker__wrapper ${className}`}>
          <DatePicker
            label={label}
            value={selectedDate}
            onChange={this.handleDateChange}
            animateYearScrolling={false}
            disablePast={disablePast}
          />
        </div>
      </Fragment>
    );
  }
}
export default BasicDatePicker;
