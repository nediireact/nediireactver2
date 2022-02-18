import {
  USER_FAVORITES_STANDS
} from 'src/constants/SystemConstants';

export const SetUserFavoriteStands = ( data: any ): any => {
  return {
    type: USER_FAVORITES_STANDS,
    data: data
  };
};

export default SetUserFavoriteStands;
