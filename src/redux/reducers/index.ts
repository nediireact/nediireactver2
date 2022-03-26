import {
  combineReducers
} from 'redux';
import { UserReducer } from 'src/redux/reducers/user-reducer';
import SystemReducer from 'src/redux/reducers/system-reducer';
import StandReducer from 'src/redux/reducers/stand-reducer';
import ExpoReducer from 'src/redux/reducers/expo-reducer';

const reducers = {
  user: UserReducer,
  system: SystemReducer,
  stand: StandReducer,
  expo: ExpoReducer
};

export default combineReducers(reducers);
