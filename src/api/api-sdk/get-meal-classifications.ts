import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import { SetUserData } from 'src/redux/actions/user-actions';

export const GetMealClassifications = (): Promise<any> => {
  return new Promise((res, rej) => {
    const user = store && store.getState().user &&
      store.getState().user.user &&
      store.getState().user.user.id ?
      store.getState().user.user : null;
    if ( !user ) return rej(new Error('no user'));
    APIGet('meal-classifications/')
      .then((response: any) => {
        const data = RebuildData(response).data;
        store.dispatch(SetUserData({
          mealClassifications: data
        }));
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetMealClassifications;
