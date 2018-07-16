
import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '../Checkbox/Checkbox.component';

class ListWithSelectionBoxes extends React.Component {
  static propTypes = {
    // eslint bug. i have used prop in static method
    list: PropTypes.arrayOf(PropTypes.shape({ // eslint-disable-line
      id: PropTypes.any,
      value: PropTypes.string,
    })),
    onClick: PropTypes.func,
  };

  static defaultProps = {
    list: [],
    onClick: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      shadowedList: [], // eslint-disable-line
    };
  }

  static getDerivedStateFromProps(props, state) {
    const newState = { ...state };
    let listHasChanged = false;
    // compare on length
    if (state.shadowedList.length !== props.list.length) {
      newState.list = props.list.map((item) => {
        // add checked value to the list
        const newItem = { ...item };
        newItem.checked = false;
        return newItem;
      });
      newState.shadowedList = props.list;
      listHasChanged = true;
    }
    if (listHasChanged) {
      return newState;
    }
    return null;
  }

  handleCheckboxChange = () => {
    // do nothing here.. we will control the child
    // checkbox state from here
    // on click of the list
  }

  handleClick = (ev) => {
    const { currentTarget: { dataset: { item, itemId } } } = ev;
    // find and set checked for that list item
    this.setState(prevState => (
      {
        ...prevState,
        list: prevState.list.map((current) => {
          const newItem = { ...current };
          if (newItem.id.toString() === itemId.toString()
           && newItem.value.toString() === item.toString()) {
            newItem.checked = !newItem.checked;
          }
          return newItem;
        }),
      }
    ), () => {
      const { list } = this.state;
      const { onClick } = this.props;
      const checkedItem = list.find(i => i.id.toString() === itemId.toString());
      onClick(checkedItem);
    });
  }

  render() {
    const { list } = this.state;
    return (
      <div>
        <List component="nav">
          {
            list.map((current, i) => (
              // eslint-disable-next-line
              <ListItem
                key={current.id}
                button
                data-item={current.value}
                data-item-id={current.id}
                onClick={this.handleClick}
              >
                <Checkbox checked={current.checked} id={`${current.id}_${i}`} onChange={this.handleCheckboxChange} />
                <ListItemText primary={current.value} />
              </ListItem>
            ))
          }
        </List>
      </div>
    );
  }
}


export default ListWithSelectionBoxes;
