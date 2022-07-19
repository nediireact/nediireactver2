import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import SystemValues from 'src/constants/SystemValues';
import { SetUserData } from 'src/redux/actions/_core/user';

const GetUserProfile = (): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().user;
    if ( !user.id ) return res(new Error('No user'));
    const url = `user-profile/?filter[user]=${user.id}`;
    APIGet(url)
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
