import {
  STAND_DATA
} from 'src/constants/SystemConstants';

const initialState: any = {};

const StandReducer = (state = initialState, action: any): any => {
  switch ( action.type ) {
    case STAND_DATA:
      const newData = { ...state, ...action.data };
      return newData;
    default:
      return state;
  }
};

export default StandReducer;
