import {
  combineReducers
} from 'redux';
// import { UserReducer } from 'src/redux/reducers/user-reducer';
// import SystemReducer from 'src/redux/reducers/system-reducer';
import SystemValues from 'src/constants/SystemValues';

const systemValues = SystemValues.getInstance();

const reducers = {
  user: systemValues.userReducer,
  system: systemValues.systemReducer
};

export default combineReducers(reducers);
