import {
  STAND_DATA
} from 'src/constants/SystemConstants';

const initialState: any = {};

const StandReducer = (state = initialState, action: any): any => {
  switch ( action.type ) {
    case STAND_DATA:
      const stand = {...action.data};
      if ( !stand.attributes ) return state;
      const slug = stand.attributes.slug;
      const entry: any = {};
      entry[slug] = stand;
      const newData = { ...state, ...entry };
      return newData;
    default:
      return state;
  }
};

export default StandReducer;
