import React from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { HashRouter as Router } from 'react-router-dom'; // BrowserRouter For HTML 5 Routing, HashRouter
import SubApps from 'SubApps';
// import { Header } from 'Elements';
import { Header } from 'react-elements-md';

import { globalFetchUserProfile, globalFetchUserProfileExtras } from './actions';
import '../Styles/styles.scss';


class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    globalFetchUserProfileAction: PropTypes.func.isRequired,
    globalFetchUserProfileExtrasAction: PropTypes.func.isRequired,

  };

  componentDidMount() {
    const {
      globalFetchUserProfileAction,
      globalFetchUserProfileExtrasAction,
    } = this.props;
    globalFetchUserProfileAction();
    globalFetchUserProfileExtrasAction();
  }

  render() {
    const { store, profile } = this.props;
    return (
      <main className="app-wrapper">
        <Router>
          <Provider store={store}>
            <section>
              <Header
                username={profile.data ? profile.data.first_name : ''}
                imageSrc={profile.data ? profile.data.profile_pic : ''}
                title="React test application"
              />
              <SubApps />
            </section>
          </Provider>
        </Router>
      </main>
    );
  }
}


function mapStateToProps(store) {
  return {
    profile: store.user.profile,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    globalFetchUserProfileAction: globalFetchUserProfile,
    globalFetchUserProfileExtrasAction: globalFetchUserProfileExtras,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
