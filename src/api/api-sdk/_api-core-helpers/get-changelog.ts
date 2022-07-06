import { APIGet } from 'src/api/communicator';
import { RebuildData } from 'rrmc';

const GetChangeLog = (): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet('sprints/?include=tasks,tasks.user&page[size]=100', true)
      .then((response: any) => {
        const data = RebuildData(response).data;
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetChangeLog;
