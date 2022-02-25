import {
  USER,
  USER_FAVORITES_STANDS,
  USER_FAVORITES_ADD_STAND,
  USER_FAVORITES_DELETE_STAND,
  USER_FAVORITES_ITEMS,
  USER_FAVORITES_ADD_ITEM,
  USER_FAVORITES_DELETE_ITEM,
  USER_CART,
  USER_ORDERS,
  USER_CART_ADD_ITEM,
  USER_CART_DELETE_ITEM,
  USER_CART_UPDATE_ITEM
} from 'src/constants/SystemConstants';

const initialState: any = {};

export const UserReducer = (state = initialState, action: any): any => {
  switch ( action.type ) {
    case USER:
      return { ...state, ...action.data };
    case USER_FAVORITES_STANDS:
      const favoriteStands = [ ...action.data ];
      return { ...state, favoriteStands };
    case USER_FAVORITES_ADD_STAND:
      const favoriteListBeforeToAddStand = [ ...state.favoriteStands ];
      const favoriteStandToAdd = action.data;
      favoriteListBeforeToAddStand.push(favoriteStandToAdd);
      return { ...state, ...{
        favoriteStands: favoriteListBeforeToAddStand
      }};
    case USER_FAVORITES_DELETE_STAND:
      const favoriteListBeforeToDeleteStand = [ ...state.favoriteStands ];
      const idFavoriteStandToDelete = action.data;
      const favoriteStandCartToDelete = favoriteListBeforeToDeleteStand.filter((i: any) => Number(i.id) === idFavoriteStandToDelete);
      if ( favoriteStandCartToDelete.length ) {
        const index = favoriteListBeforeToDeleteStand.indexOf(favoriteStandCartToDelete[0]);
        favoriteListBeforeToDeleteStand.splice(index, 1);
      }
      return { ...state, ...{
        favoriteStands: favoriteListBeforeToDeleteStand
      }};
    case USER_FAVORITES_ITEMS:
      const favoriteItems = [ ...action.data ];
      return { ...state, favoriteItems };
    case USER_FAVORITES_ADD_ITEM:
      const favoriteListBeforeToAddItem = [ ...state.favoriteItems ];
      const favoriteItemToAdd = action.data;
      favoriteListBeforeToAddItem.push(favoriteItemToAdd);
      return { ...state, ...{
        favoriteItems: favoriteListBeforeToAddItem
      }};
    case USER_FAVORITES_DELETE_ITEM:
      const favoriteListBeforeToDeleteItem = [ ...state.favoriteItems ];
      const idFavoriteItemToDelete = action.data;
      const favoriteItemCartToDelete = favoriteListBeforeToDeleteItem.filter((i: any) => Number(i.id) === idFavoriteItemToDelete);
      if ( favoriteItemCartToDelete.length ) {
        const index = favoriteListBeforeToDeleteItem.indexOf(favoriteItemCartToDelete[0]);
        favoriteListBeforeToDeleteItem.splice(index, 1);
      }
      return { ...state, ...{
        favoriteItems: favoriteListBeforeToDeleteItem
      }};
    case USER_CART:
      const cart = [ ...action.data ];
      return { ...state, cart };
    case USER_CART_ADD_ITEM:
      const cartBeforeToAddItem = [ ...state.cart ];
      const cartItemToAdd = action.data;
      cartBeforeToAddItem.push(cartItemToAdd);
      return { ...state, ...{
        cart: cartBeforeToAddItem
      }};
    case USER_CART_DELETE_ITEM:
      const cartBeforeToDeleteItem = [ ...state.cart ];
      const idCartItemToDelete = action.data;
      const itemCartToDelete = cartBeforeToDeleteItem.filter((i: any) => Number(i.id) === idCartItemToDelete);
      if ( itemCartToDelete.length ) {
        const index = cartBeforeToDeleteItem.indexOf(itemCartToDelete[0]);
        cartBeforeToDeleteItem.splice(index, 1);
      }
      return { ...state, ...{
        cart: cartBeforeToDeleteItem
      }};
    case USER_CART_UPDATE_ITEM:
      const cartBeforeToUpdateItem = [ ...state.cart ];
      const cartItemToUpdate = action.data;
      for (let j = 0; j < cartBeforeToUpdateItem.length; j++) {
        if ( cartBeforeToUpdateItem[j].id === cartItemToUpdate.id ) {
          cartBeforeToUpdateItem[j] = cartItemToUpdate;
        }
      }
      return { ...state, ...{
        cart: cartBeforeToUpdateItem
      }};
    case USER_ORDERS:
      const orders = [ ...action.data ];
      return { ...state, orders };
    default:
      return state;
  }
};
