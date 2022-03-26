import {
  APIDelete,
  APIPost
} from 'src/api/communicator';
import { UserFavoriteItemsConverter } from 'src/modules/utils/products-services';
import NewCartItem from 'src/modules/user-cart/new-cart-item.json';

export const DeleteFavoriteItem = ( id: number ): Promise<any> => {
  return new Promise((res, rej) => {
    const url = `user-favorite-items/${id}/`;
    APIDelete(url)
      .then((response: any) => {
        res(response);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export const AddFavoriteItem = ( item: any, user: any ): Promise<any> => {
  return new Promise((res, rej) => {
    if ( !user || !user.id ) return res(new Error('Invalid data'));
    const data: any = { ...NewCartItem };
    const userName = `${user.attributes.first_name} ${user.attributes.last_name}`;
    data.data.type = 'UserFavoriteBuyableItems';
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
    APIPost('user-favorite-items/', data, true)
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

export const DeleteFavoriteStand = ( id: number ): Promise<any> => {
  return new Promise((res, rej) => {
    const url = `user-favorite-stands/${id}/`;
    APIDelete(url)
      .then((response: any) => {
        res(response);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export const AddFavoriteStand = ( item: any, user: any ): Promise<any> => {
  return new Promise((res, rej) => {
    if ( !user || !user.id ) return res(new Error('Invalid data'));
    const data: any = { data: {
      type: 'UserFavoriteStands',
      relationships: {
        stand: { data: { type: 'Stand', id: item.id } },
        user: { data: { type: 'User', id: user.id } }
      }
    }};
    APIPost('user-favorite-stands/', data, true)
      .then((response: any) => {
        const itemAdded = { ...response.data };
        if ( itemAdded.attributes && itemAdded.relationships &&
          itemAdded.relationships.stand &&
          itemAdded.relationships.stand.data ) {
          itemAdded.relationships.stand.data = { ...item };
          res(itemAdded);
        }
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};
