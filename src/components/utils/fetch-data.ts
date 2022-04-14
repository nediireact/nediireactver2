import { APIGet } from 'src/api/communicator';
import { RebuildData } from 'rrmc';

const fetchData = ( url: string ): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet( url )
      .then((d: any) => {
        res(RebuildData(d));
      })
      .catch((error) => {
        rej(error);
      });
  });
};

export default fetchData;
