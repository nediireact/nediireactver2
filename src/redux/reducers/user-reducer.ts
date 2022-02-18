import {
  USER,
  USER_FAVORITES_STANDS,
  USER_FAVORITES_ITEMS
} from 'src/constants/SystemConstants';

const initialState: any = {};

export const UserReducer = (state = initialState, action: any): any => {
  switch ( action.type ) {
    case USER:
      return { ...state, ...action.data };
    case USER_FAVORITES_STANDS:
      const favoriteStands = [ ...action.data ];
      return { ...state, favoriteStands };
    case USER_FAVORITES_ITEMS:
      const favoriteItems = [ ...action.data ];
      return { ...state, favoriteItems };
    default:
      return state;
  }
};
