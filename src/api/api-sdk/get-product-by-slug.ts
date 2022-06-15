import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';

export const GetProductBySlug = (productId: string): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet(`products?filter[slug]=${productId}&include=product_pictures,stand,classification,delivery_type,features`)
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

export default GetProductBySlug;
