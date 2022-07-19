import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import { SetUserData } from 'src/redux/actions/_core/user';

export const GetProductClassifications = (): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet('product-classifications')
      .then((response: any) => {
        const data = response.data;
        store.dispatch(SetUserData({
          productClassifications: data
        }));
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetProductClassifications;
