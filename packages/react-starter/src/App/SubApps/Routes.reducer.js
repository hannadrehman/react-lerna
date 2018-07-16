import { combineReducers } from 'redux';


const homeReducer = () => ({});

const routesReducer = combineReducers({
  home: homeReducer,
});

export default routesReducer;
