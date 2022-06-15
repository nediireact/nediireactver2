import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';

export const GetServiceBySlug = (serviceId: string): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet(`services?filter[slug]=${serviceId}&include=classification,features,stand,service_pictures,related`)
      .then((response: any) => {
        const data = RebuildData(response).data;
        if ( !data.length ) {
          return rej('error');
        }
        res(data[0]);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetServiceBySlug;
