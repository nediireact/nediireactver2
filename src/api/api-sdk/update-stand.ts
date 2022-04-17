import { APIPatch } from 'src/api/communicator';
import store from 'src/redux/store';

export const UpdateStand = (stand: any): Promise<any> => {
  return new Promise((res, rej) => {
    const user = store && store.getState().user &&
      store.getState().user.user &&
      store.getState().user.user.id ?
      store.getState().user.user : null;
    if ( !user ) return rej(new Error('no user'));
    const data: any = {
      data: {
        type: 'Stand',
        ...stand
      }
    };
    APIPatch(`stands/${stand.id}/`, data)
      .then((response: any) => {
        res(response.data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default UpdateStand;
