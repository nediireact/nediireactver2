import { APIDelete } from 'src/api/communicator';
import store from 'src/redux/store';

export const DeleteStandById = ( standId: number ): Promise<any> => {
  return new Promise((res, rej) => {
    const user = store && store.getState().user &&
      store.getState().user.user &&
      store.getState().user.user.id ?
      store.getState().user.user : null;
    if ( !user ) return rej(new Error('no user'));
    APIDelete(`stands/${standId}/`)
      .then(() => {
        res(true);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default DeleteStandById;
