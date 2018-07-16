import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import './ImageAvatar.style.scss';

const DUMMY_IMAGE_PLACEHOLDER = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRui0qU3H754Sulya39NTG7GZ9w48OtvoHXZnK63igQTUiEgDR2tw';

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
