import { APIPatch } from 'src/api/communicator';
import store from 'src/redux/store';

export const UpdateBuyableItem = (item: any): Promise<any> => {
  return new Promise((res, rej) => {
    const user = store && store.getState().user &&
      store.getState().user.user &&
      store.getState().user.user.id ?
      store.getState().user.user : null;
    if ( !user ) return rej(new Error('no user'));
    const data: any = {
      data: {
        id: item.id,
        type: item.itemType,
        attributes: item
      }
    };
    APIPatch(`products/${item.id}/`, data)
      .then((response: any) => {
        res(response.data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default UpdateBuyableItem;
