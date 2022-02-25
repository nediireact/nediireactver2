import {
  USER_FAVORITES_STANDS,
  USER_FAVORITES_ADD_STAND,
  USER_FAVORITES_DELETE_STAND
} from 'src/constants/SystemConstants';

export const SetUserFavoriteStands = ( data: any ): any => {
  return {
    type: USER_FAVORITES_STANDS,
    data: data
  };
};

export const UserFavoritesAddStand = ( data: any ): any => {
  return {
    type: USER_FAVORITES_ADD_STAND,
    data: data
  };
};

export const UserFavoritesDeleteStand = ( id: number ): any => {
  return {
    type: USER_FAVORITES_DELETE_STAND,
    data: id
  };
};

