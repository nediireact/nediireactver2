import { APIDelete } from 'src/api/communicator';
import SystemValues from 'src/constants/SystemValues';

export const DeleteCartItem = ( id: number ): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().user;
    if ( !user.id ) return res(new Error('No user'));
    const url = `user-cart-items/${id}/`;
    APIDelete(url)
      .then(() => {
        res(true);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default DeleteCartItem;
