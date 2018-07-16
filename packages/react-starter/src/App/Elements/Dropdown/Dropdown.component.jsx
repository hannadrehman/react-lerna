import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './Dropdown.styles.scss';

class Dropdown extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    className: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.any,
      value: PropTypes.string,
    })).isRequired,
    onSelected: PropTypes.func.isRequired,
    show: PropTypes.bool,
    forceClose: PropTypes.func,
    selected: PropTypes.oneOfType([PropTypes.string,PropTypes.number]), // eslint-disable-line
  }

  static defaultProps = {
    required: false,
    className: '',
    show: false,
    forceClose: () => {},
    selected: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedId: '',
      requiredValidationFailed: false,
      show: props.show || false,
      shadowShow: props.show || false, // eslint-disable-line
      shadowSelected: '', // eslint-disable-line
    };
  }

  static getDerivedStateFromProps=(props, state) => {
    let showFlag = false;
    let selectedFlag = false;
    const newState = { ...state };
    if (props.show !== newState.shadowShow) {
      newState.show = props.show;
      newState.shadowShow = props.show;
      showFlag = true;
    }
    if (props.selected !== newState.shadowSelected) {
      newState.selected = props.shadowSelected;
      newState.shadowSelected = props.selected;
      newState.selectedId = props.selected;
      selectedFlag = true;
    }
    if (showFlag || selectedFlag) {
      return newState;
    }
    return null;
  }

  handleChange = (event) => {
    const { target: { value }, currentTarget: { textContent } } = event;
    const { required, onSelected } = this.props;

    this.setState({
      selectedId: value,
      requiredValidationFailed: (!value && required),
    });

    onSelected({
      id: value,
      value: textContent,
    });
  };

  handleClose=(ev) => {
    const { forceClose } = this.props;
    forceClose(ev);
  }

  renderOptions = () => {
    try {
      const { options } = this.props;
      return options.map(item => (
        <MenuItem key={item.id} value={item.id}>
          {item.value}
        </MenuItem>
      ));
    } catch (e) {
      return [];
    }
  }

  render() {
    const {
      required, id, label, className,
    } = this.props;
    const { requiredValidationFailed, selectedId, show } = this.state;
    return (
      <div className="dropdown dropdown__wrapper">
        <FormControl
          required={required}
          className="dropdown__formcontrol"
        >
          <InputLabel
            className={(required && requiredValidationFailed) ? 'dropdown--error' : ''}
            htmlFor={id}
          >
            {label}
          </InputLabel>
          <Select
            error={requiredValidationFailed === true}
            value={selectedId}
            onChange={this.handleChange}
            name={id}
            inputProps={{
              id,
            }}
            className={className}
            fullWidth
            open={show ? true : undefined}
            native={false}
            onClose={this.handleClose}
          >
            <MenuItem value="">
              <em>
                None
              </em>
            </MenuItem>
            {this.renderOptions()}
          </Select>
          {
            required
            && (
            <FormHelperText className={requiredValidationFailed ? 'dropdown--error' : ''}>
              Required
            </FormHelperText>
            )
          }
        </FormControl>
      </div>
    );
  }
}

export default Dropdown;
