import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import { SetUserData } from 'src/redux/actions/user-actions';
import rebuildData from 'src/modules/utils/json-api-rebuild';

export const GetUserAddress = (): Promise<any> => {
  return new Promise((res, rej) => {
    const user = store && store.getState().user &&
      store.getState().user.user &&
      store.getState().user.user.id ?
      store.getState().user.user : null;
    if ( !user ) return rej(new Error('no user'));
    const url = `user-address/?filter[user]=${user.id}&include=city,city.state`;
    APIGet(url, true)
      .then((response: any) => {
        const data = rebuildData(response).data;
        store.dispatch(SetUserData({
          userAddress: data
        }));
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetUserAddress;
