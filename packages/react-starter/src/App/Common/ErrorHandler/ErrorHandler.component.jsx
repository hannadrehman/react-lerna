import React from 'react';
import PropTypes from 'prop-types';

import './ErrorHandler.styles.scss';

class ErrorHandler extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.error(error);// eslint-disable-line
    console.info(info); // eslint-disable-line
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <section className="errorhandler errorhandler__wrapper">
          <img alt="err" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Error.svg/497px-Error.svg.png" />
          <h1>
            Some Error Occured
          </h1>
        </section>);
    }
    return (
      <section className="e-h error-checked">
        {children}
      </section>
    );
  }
}


export default ErrorHandler;
