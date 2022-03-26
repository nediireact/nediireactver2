import { APIGet } from 'src/api/communicator';

export const GetNediiPlans = (): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet('nedii-plans', true)
      .then((response: any) => {
        res(response.data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetNediiPlans;
