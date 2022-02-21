import {
  USER,
  USER_FAVORITES_STANDS,
  USER_FAVORITES_ITEMS,
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
    case USER_FAVORITES_ITEMS:
      const favoriteItems = [ ...action.data ];
      return { ...state, favoriteItems };
    case USER_CART:
      const cart = [ ...action.data ];
      return { ...state, cart };
    case USER_CART_ADD_ITEM:
      const cartBeforeToAddItem = [ ...state.cart ];
      const itemToAdd = action.data;
      cartBeforeToAddItem.push(itemToAdd);
      return { ...state, ...{
        cart: cartBeforeToAddItem
      }};
    case USER_CART_DELETE_ITEM:
      const cartBeforeToDeleteItem = [ ...state.cart ];
      const idItemToDelete = action.data;
      const itemToDelete = cartBeforeToDeleteItem.filter((i: any) => Number(i.id) === idItemToDelete);
      if ( itemToDelete.length ) {
        const index = cartBeforeToDeleteItem.indexOf(itemToDelete[0]);
        cartBeforeToDeleteItem.splice(index, 1);
      }
      return { ...state, ...{
        cart: cartBeforeToDeleteItem
      }};
    case USER_CART_UPDATE_ITEM:
      const cartBeforeToUpdateItem = [ ...state.cart ];
      const itemToUpdate = action.data;
      for (let j = 0; j < cartBeforeToUpdateItem.length; j++) {
        if ( cartBeforeToUpdateItem[j].id === itemToUpdate.id ) {
          cartBeforeToUpdateItem[j] = itemToUpdate;
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
