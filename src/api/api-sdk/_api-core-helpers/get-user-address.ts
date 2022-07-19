import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import SystemValues from 'src/constants/SystemValues';
import { RebuildData } from 'rrmc';
import { SetUserData } from 'src/redux/actions/_core/user';

export const GetUserAddress = (): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().user;
    if ( !user.id ) return res(new Error('No user'));
    const url = `user-address/?filter[user]=${user.id}&include=city,city.state`;
    APIGet(url)
      .then((response: any) => {
        const data = RebuildData(response).data;
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
