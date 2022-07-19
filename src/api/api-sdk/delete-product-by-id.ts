import { APIDelete } from 'src/api/communicator';
import SystemValues from 'src/constants/SystemValues';

export const DeleteProductById = ( itemId: number ): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().user;
    if ( !user.id ) return res(new Error('No user'));
    APIDelete(`products/${itemId}/`)
      .then(() => {
        res(true);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default DeleteProductById;
