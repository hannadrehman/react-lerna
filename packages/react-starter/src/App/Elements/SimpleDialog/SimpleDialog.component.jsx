import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import Button from '../Button/Button.component';

const SimpleDialog = ({
  show, onClose, onOk, okButtonText, cancelButtonText, children, showActions,
}) => (
  <div>
    <Dialog
      open={show}
      onClose={onClose}
    >
      <DialogTitle id="alert-dialog-title">
        {children && children[0]}
      </DialogTitle>
      <DialogContent>
        {children && children[1]}
      </DialogContent>
      {
        showActions
        && (
        <DialogActions>
          <Button onClick={onClose} theme="primary" text={cancelButtonText} />
          <Button onClick={onOk} theme="primary" text={okButtonText} />
        </DialogActions>
        )
      }
    </Dialog>
  </div>
);

SimpleDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOk: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  cancelButtonText: PropTypes.string,
  okButtonText: PropTypes.string,
  showActions: PropTypes.bool,
};
SimpleDialog.defaultProps = {
  cancelButtonText: 'Cancel',
  okButtonText: 'Ok',
  showActions: true,
  onOk: () => {},
};
export default SimpleDialog;
