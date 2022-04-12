import {
  SET_SYSTEM_CONFIGURATIONS,
  SWITCH_DARK_MODE,
  SET_MOBILE_PLATOFORM,
  SET_GLOBAL_ALERT_DIALOG,
  SYSTEM_DATA
} from 'src/constants/SystemConstants';

const initialState: any = {
  darkMode: false,
  platform: {
    os: 'web',
    prefix: ''
  },
  configurations: null,
  globalAlert: null
};

const SystemReducer = (state = initialState, action: any): any => {
  switch ( action.type ) {
    case SET_SYSTEM_CONFIGURATIONS:
      return { ...state, ...{ configurations: action.data }};
    case SWITCH_DARK_MODE:
      return { ...state, ...{ darkMode: action.data }};
    case SET_MOBILE_PLATOFORM:
      return { ...state, ...{ platform: action.data }};
    case SET_GLOBAL_ALERT_DIALOG:
      return { ...state, ...{ globalAlert: action.data }};
    case SYSTEM_DATA:
      return { ...state, ...action.data };
    default:
      return state;
  }
};

export default SystemReducer;
