import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import './Header.styles.scss';
import ImageAvatar from '../ImageAvatar/ImageAvatar.component';

const Header = ({ username, imageSrc }) => (
  <div className="header header__wrapper">
    <AppBar position="static">
      <Toolbar className="header__flexer">
        <section>
          <Typography variant="title" color="inherit">
            <Link to="/" href="/" className="header__logo">
              Application Name
            </Link>
          </Typography>
        </section>
        <section className="header__useravatar">
          <ImageAvatar src={imageSrc} />
          <p>
            {username}
          </p>
        </section>
      </Toolbar>
    </AppBar>
  </div>
);
Header.propTypes = {
  username: PropTypes.string,
  imageSrc: PropTypes.string,
};
Header.defaultProps = {
  username: '',
  imageSrc: '',
};

export default withRouter(Header);
