import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import SystemValues from 'src/constants/SystemValues';
import SetSystemData from 'src/redux/actions/_core/system';

export const GetVehicleClassificationsByStand = (standId: number): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet(`vehicle-classifications/?filter[stand]=${standId}`)
      .then((response: any) => {
        const data = response.data;
        const classifications = SystemValues.getInstance().system.vehicleClassificationsByStand;
        classifications[standId] = data;
        store.dispatch(SetSystemData({
          vehicleClassificationsByStand: classifications
        }));
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetVehicleClassificationsByStand;
