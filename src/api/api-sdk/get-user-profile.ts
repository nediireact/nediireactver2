import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import { SetUserData } from 'src/redux/actions/user-actions';

export const GetUserProfile = (): Promise<any> => {
  return new Promise((res, rej) => {
    const user = store && store.getState().user &&
      store.getState().user.user &&
      store.getState().user.user.id ?
      store.getState().user.user : null;
    const url = `user-profile/?filter[user]=${user.id}`;
    APIGet(url, true)
      .then((response: any) => {
        const data = response.data[0];
        store.dispatch(SetUserData({
          userProfile: data
        }));
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetUserProfile;
