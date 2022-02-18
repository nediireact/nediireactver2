import {
  USER_FAVORITES_ITEMS
} from 'src/constants/SystemConstants';

export const SetUserFavoriteItems = ( data: any ): any => {
  return {
    type: USER_FAVORITES_ITEMS,
    data: data
  };
};

export default SetUserFavoriteItems;
