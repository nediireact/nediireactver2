import {
  USER_FAVORITES_ITEMS,
  USER_FAVORITES_ADD_ITEM,
  USER_FAVORITES_DELETE_ITEM
} from 'src/constants/SystemConstants';

export const SetUserFavoriteItems = ( data: any ): any => {
  return {
    type: USER_FAVORITES_ITEMS,
    data: data
  };
};

export const UserFavoritesAddItem = ( data: any ): any => {
  return {
    type: USER_FAVORITES_ADD_ITEM,
    data: data
  };
};

export const UserFavoritesDeleteItem = ( id: number ): any => {
  return {
    type: USER_FAVORITES_DELETE_ITEM,
    data: id
  };
};
