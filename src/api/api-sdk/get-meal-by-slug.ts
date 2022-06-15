import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';

export const GetMealBySlug = (mealId: string): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet(`meals?filter[slug]=${mealId}&include=meal_pictures,meal_addons,classification,stand`)
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

export default GetMealBySlug;
