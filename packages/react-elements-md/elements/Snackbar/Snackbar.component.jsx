import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';

class AppSnackbar extends React.Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    visible: PropTypes.string //eslint-disable-line
  };

  static defaultProps = {
    visible: 'true',
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      shadowedvisible: false,
    };
  }

  static getDerivedStateFromProps = (props, state) => {
    let visibleFlag = false;
    const newState = { ...state };
    if (newState.shadowedvisible !== props.visible) {
      newState.visible = props.visible;
      newState.shadowedvisible = props.visible;
      visibleFlag = true;
    }
    if (visibleFlag) {
      return newState;
    }
    return null;
  };

  handleClose = () => {
    this.setState(prevState => ({
      ...prevState,
      visible: false,
    }));
  };

  render() {
    const { message } = this.props;
    const { visible } = this.state;
    return (
      <div>
        <Snackbar
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={visible === 'true'}
          autoHideDuration={4000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={(
            <span id="message-id">
              {message}
            </span>
)}
        />
      </div>
    );
  }
}

export default AppSnackbar;
