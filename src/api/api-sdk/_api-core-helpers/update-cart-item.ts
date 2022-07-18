import { APIPatch } from 'src/api/communicator';
import SystemValues from 'src/constants/SystemValues';
import GetUserProfile from './get-cart-items';

export const UpdateCartItem = ( item: any ): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().user;
    if ( !user.id ) return res(new Error('No user'));
    const url = `user-cart-items/${item.data.id}/`;
    let itemUpdated: any;
    APIPatch(url, item)
      .then((response: any) => {
        itemUpdated = { ...response.data };
        return GetUserProfile();
      })
      .then(() => {
        res(itemUpdated);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default UpdateCartItem;
