import React from 'react';
import PropTypes from 'prop-types';

import { DUMMY_IMAGE_PLACEHOLDER } from '../../../Constants/elements/element.constants';
import './UserTileWithInfo.styles.scss';

const UserTileWithInfo = ({
  user: {
    profile_pic: profilePic, name, coachTypeName, isActive, expert_id: expertId, username,
  }, onClick,
}) => (
  <div
    className="usertilewithinfo usertilewithinfo__wrapper"
    role="presentation"
    onClick={(e) => { onClick(expertId, username, e); }}
    onKeyDown={(e) => { onClick(expertId, username, e); }}
  >
    <div className="content">
      <section className="usertilewithinfo__image">
        <img src={profilePic || DUMMY_IMAGE_PLACEHOLDER} alt={name} />
      </section>
      <section className="usertilewithinfo__info">
        <p className="name">
          {name}
        </p>
        <p className="designation">
          {coachTypeName}
        </p>
      </section>
    </div>
    {
      !isActive
      && <section className="usertilewithinfo--grayed" />
    }
  </div>
);

UserTileWithInfo.propTypes = {
  user: PropTypes.object.isRequired, //eslint-disable-line
  onClick: PropTypes.func,
};
UserTileWithInfo.defaultProps = {
  onClick: () => {},
};
export default UserTileWithInfo;
