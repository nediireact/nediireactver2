import {
  USER_CART,
  USER_CART_ADD_ITEM,
  USER_CART_DELETE_ITEM,
  USER_CART_UPDATE_ITEM
} from 'src/constants/SystemConstants';

export const SetUserCart = ( data: any ): any => {
  return {
    type: USER_CART,
    data: data
  };
};

export const UserCartAddItem = ( data: any ): any => {
  return {
    type: USER_CART_ADD_ITEM,
    data: data
  };
};

export const UserCartDeleteItem = ( id: number ): any => {
  return {
    type: USER_CART_DELETE_ITEM,
    data: id
  };
};

export const UserCartUpdateItem = ( data: any ): any => {
  return {
    type: USER_CART_UPDATE_ITEM,
    data: data
  };
};
