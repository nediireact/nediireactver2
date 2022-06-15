import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import SystemValues from 'src/constants/SystemValues';
import { SetUserData } from 'src/redux/actions/_core/user';

const GetUser = (): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().user;
    if ( !user.id ) return rej(new Error('No user'));
    const url = `users/${user.id}`;
    APIGet(url)
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
