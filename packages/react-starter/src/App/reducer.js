import { combineReducers } from 'redux';
import routeActionNames from './actionNames';
import routeReducer from './SubApps/Routes.reducer';
import { SimpleApiStoreStates } from '../Services/utility/objects';

const defaultState = {
  profile: {
    loading: false,
    data: null,
    error: null,
  },
  extraProfile: {
    loading: false,
    data: null,
    error: null,
  },
};
const userReducer = (state = defaultState, actions) => {
  switch (actions.type) {
    case routeActionNames.FETCH_USER_PROFILE_LOADING:
      return SimpleApiStoreStates(state, 'profile', { loading: true });
    case routeActionNames.FETCH_USER_PROFILE_SUCCESS:
      return SimpleApiStoreStates(state, 'profile', { loading: false, data: actions.payload, error: null });
    case routeActionNames.FETCH_USER_PROFILE_FAILURE:
      return SimpleApiStoreStates(state, 'profile', { loading: false, data: null, error: actions.payload });
    case routeActionNames.FETCH_USER_EXTRA_PROFILE_LOADING:
      return SimpleApiStoreStates(state, 'extraProfile', { loading: true });
    case routeActionNames.FETCH_USER_EXTRA_PROFILE_SUCCESS:
      return SimpleApiStoreStates(state, 'extraProfile', { loading: false, data: actions.payload, error: null });
    case routeActionNames.FETCH_USER_EXTRA_PROFILE_FAILURE:
      return SimpleApiStoreStates(state, 'extraProfile', { loading: false, data: null, error: actions.payload });
    default:
      return state;
  }
};
const defState = {
};
const appReducer = (state = defState, actions) => {
  switch (actions.type) {
    default:
      return state;
  }
};
const reducer = combineReducers({
  user: userReducer,
  routes: routeReducer,
  app: appReducer,
});
export default reducer;
