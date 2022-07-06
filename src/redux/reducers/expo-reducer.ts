import {
  EXPO_DATA
} from 'src/constants/SystemValues';

const initialState: any = {};

const ExpoReducer = (state = initialState, action: any): any => {
  switch ( action.type ) {
    case EXPO_DATA:
      const expo = {...action.data};
      if ( !expo.attributes ) return state;
      const slug = expo.attributes.slug;
      const entry: any = {};
      entry[slug] = expo;
      const newData = { ...state, ...entry };
      return newData;
    default:
      return state;
  }
};

export default ExpoReducer;
