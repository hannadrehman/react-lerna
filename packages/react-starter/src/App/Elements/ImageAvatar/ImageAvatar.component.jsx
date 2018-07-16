import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { DUMMY_IMAGE_PLACEHOLDER } from '../../../Constants/elements/element.constants';
import './ImageAvatar.style.scss';

const ImageAvatar = ({ src, className }) => (
  <div className="imageavatar imageavatar__wrapper">
    <Avatar alt="Remy Sharp" src={src || DUMMY_IMAGE_PLACEHOLDER} className={className} />
  </div>
);

ImageAvatar.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
};
ImageAvatar.defaultProps = {
  className: '',
  src: '',
};

export default (ImageAvatar);
