import React from 'react';
import PropTypes from 'prop-types';
import Textbox from '../Textbox/Textbox.component';
import { Alert } from '../../Common';

import Suggestions from './Suggestions/Suggestions.component';

import getUsersByName from './AutocompleteSearch.utility';
import { ALERT_TYPES } from '../../../Constants/elements/element.constants';

import './AutocompleteSearch.styles.scss';

class AutocompleteSearch extends React.Component {
  static propTypes={
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    onSelected: PropTypes.func.isRequired,
  }

  static defaultProps = {
    className: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      options: [],
      apiFailed: false,
    };
  }

  getOptions = async (input) => {
    try {
      const response = await getUsersByName(input);
      this.setState({
        options: response,
        apiFailed: false,
      });
    } catch (e) {
      this.setState({
        options: [],
        apiFailed: true,
      });
    }
  }

  handleChange = (text) => {
    this.getOptions(text);
  }

  handleClick = (ev) => {
    const { currentTarget: { dataset: { item, itemId } } } = ev;
    // find current option and send it to parent
    const { options } = this.state;
    const option = options.find(c => c.id.toString() === itemId.toString()
      && c.value.toString() === item.toString());
    if (option) {
      const { onSelected } = this.props;
      onSelected(option);
    }
  }

  render() {
    const { className, id } = this.props;
    const { apiFailed, options } = this.state;
    return (
      <div className="autocompletesearch autocompletesearch__wrapper">
        <section className={className}>
          <Textbox
            id={id}
            label="Search user by email"
            onChange={this.handleChange}
            className="autocompletesearch autocompletesearch--max-width"
          />
        </section>
        <section>
          {
            !apiFailed
              && <Suggestions options={options} onClick={this.handleClick} />
            }
          <Alert message="Some error occured please try again" type={ALERT_TYPES.DANGER} visible={apiFailed === true} />
        </section>
      </div>
    );
  }
}

export default AutocompleteSearch;
