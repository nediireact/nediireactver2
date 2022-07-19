import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import SystemValues from 'src/constants/SystemValues';
import SetSystemData from 'src/redux/actions/_core/system';

export const GetProductClassificationsByStand = (id: number): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet(`product-classifications/?filter[stand]=${id}`)
      .then((response: any) => {
        const data = response.data;
        const productClassificationsByStand = SystemValues.getInstance().system.productClassificationsByStand;
        productClassificationsByStand[id] = data;
        store.dispatch(SetSystemData({
          productClassificationsByStand: productClassificationsByStand
        }));
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetProductClassificationsByStand;
