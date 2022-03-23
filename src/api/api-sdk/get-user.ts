import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import { SetUserData } from 'src/redux/actions/user-actions';

export const GetUser = (): Promise<any> => {
  return new Promise((res, rej) => {
    const user = store && store.getState().user &&
      store.getState().user.user &&
      store.getState().user.user.id ?
      store.getState().user.user : null;
    const url = `users/${user.id}`;
    APIGet(url, true)
      .then((response: any) => {
        store.dispatch(SetUserData({
          user: response.data
        }));
        res(response.data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetUser;
