
import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const SimpleList = ({ list, onClick }) => (
  <div>
    <List component="nav">
      {
      list.map(current => (
        // eslint-disable-next-line
        <ListItem key={current.id} button data-item={current.value} data-item-id={current.id} onClick={onClick}>
          <ListItemText primary={current.value} />
        </ListItem>
      ))
    }
    </List>
  </div>
);

SimpleList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
    value: PropTypes.string,
  })),
  onClick: PropTypes.func,
};
SimpleList.defaultProps = {
  list: [],
  onClick: () => {},
};

export default SimpleList;
