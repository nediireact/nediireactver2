import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import SetSystemData from 'src/redux/actions/_core/system';

export const GetServiceClassifications = (): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet('services-classifications/')
      .then((response: any) => {
        const data = response.data;
        store.dispatch(SetSystemData({
          serviceClassifications: data
        }));
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetServiceClassifications;
