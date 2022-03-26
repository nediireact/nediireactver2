import {
  APIDelete,
  APIPost,
  APIPatch
} from 'src/api/communicator';
import { UserFavoriteItemsConverter } from 'src/modules/utils/products-services';
import NewCartItem from 'src/modules/user-cart/new-cart-item.json';

export const DeleteCartItem = ( id: number ): Promise<any> => {
  return new Promise((res, rej) => {
    const url = `user-cart-items/${id}/`;
    APIDelete(url)
      .then((response: any) => {
        res(response);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export const AddCartItem = ( item: any, user: any ): Promise<any> => {
  return new Promise((res, rej) => {
    if ( !user || !user.id ) return res(new Error('Invalid data'));
    const data: any = { ...NewCartItem };
    const userName = `${user.attributes.first_name} ${user.attributes.last_name}`;
    data.data.type = 'UserCartBuyableItems';
    data.data.relationships.user.data = null;
    data.data.relationships.product.data = null;
    data.data.relationships.meal.data = null;
    data.data.relationships.real_estate.data = null;
    data.data.relationships.service.data = null;
    data.data.relationships.vehicle.data = null;
    data.data.attributes.backup_name = item.backup_name;
    data.data.attributes.backup_user_name = userName;
    data.data.relationships.user.data = {
      type: 'User',
      id: user.id
    };
    data.data.relationships[UserFavoriteItemsConverter(item.type)].data = {
      id: item.id,
      type: item.type
    };
    APIPost('user-cart-items/', data, true)
      .then((response: any) => {
        const itemAdded = { ...response.data };
        if ( itemAdded.attributes && itemAdded.relationships &&
          itemAdded.relationships[UserFavoriteItemsConverter(item.type)] &&
          itemAdded.relationships[UserFavoriteItemsConverter(item.type)].data ) {
          itemAdded.relationships[UserFavoriteItemsConverter(item.type)].data = { ...item };
          res(itemAdded);
        }
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export const UpdateCartItem = ( item: any, user: any ): Promise<any> => {
  return new Promise((res, rej) => {
    if ( !user || !user.id ) return res(new Error('Invalid data'));
    const url = `user-cart-items/${item.data.id}/`;
    APIPatch(url, item, true)
      .then((response: any) => {
        const itemUpdated = { ...response.data };
        res(itemUpdated);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};
