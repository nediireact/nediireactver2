import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';

export const GetRealEstateBySlug = (realEstateId: string): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet(`real-estates?filter[slug]=${realEstateId}&include=classification,real_estate_pictures,features`)
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

export default GetRealEstateBySlug;
