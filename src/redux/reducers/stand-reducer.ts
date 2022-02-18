import {
  STAND_DATA,
  UPDATE_STAND_AVERAGE_RATING
} from 'src/constants/SystemConstants';

const initialState: any = {};

const StandReducer = (state = initialState, action: any): any => {
  switch ( action.type ) {
    case STAND_DATA:
      const stand = { ...action.data };
      if ( !stand.attributes ) return state;
      const slug = stand.attributes.slug;
      const entry: any = {};
      entry[slug] = stand;
      const newData = { ...state, ...entry };
      return newData;
    case UPDATE_STAND_AVERAGE_RATING:
      const newStandData: any = { ...state };
      newStandData[action.data.standSlug].attributes.average_rating = action.data.rating;
      return newStandData;
    default:
      return state;
  }
};

export default StandReducer;
