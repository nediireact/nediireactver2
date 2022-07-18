import {
  SET_SYSTEM_CONFIGURATIONS,
  SWITCH_DARK_MODE,
  SET_MOBILE_PLATOFORM,
  SET_GLOBAL_ALERT_DIALOG,
  SYSTEM_DATA,
  EXPO_DATA,
  STAND_DATA,
  UPDATE_STAND_AVERAGE_RATING
} from 'src/constants/SystemValues';

const initialState: any = {
  darkMode: false,
  platform: {
    os: 'web',
    prefix: ''
  },
  configurations: null,
  globalAlert: null
};

const setExpoData = (state = initialState, action: any): any => {
  const expo = {...action.data};
  if ( !expo.attributes ) return state;
  const slug = expo.attributes.slug;
  const entry: any = {};
  entry[slug] = expo;
  const newData = { ...state, ...entry };
  return newData;
};

const setStandData = (state = initialState, action: any): any => {
  const stand = { ...action.data };
  if ( !stand.attributes ) return state;
  const slug = stand.attributes.slug;
  const entry: any = {};
  entry[slug] = stand;
  const newData = { ...state, ...entry };
  return newData;
};

const updateStandRating = (state = initialState, action: any): any => {
  const newStandData: any = { ...state };
  newStandData[action.data.standSlug].attributes.average_rating = action.data.rating;
  return newStandData;
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
    case EXPO_DATA:
      return setExpoData(state, action);
    case STAND_DATA:
      return setStandData(state, action);
    case UPDATE_STAND_AVERAGE_RATING:
      return updateStandRating(state, action);
    default:
      return state;
  }
};

export default SystemReducer;
