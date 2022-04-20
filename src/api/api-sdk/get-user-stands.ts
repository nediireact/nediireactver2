import { RebuildData } from 'rrmc';
import { APIGet } from 'src/api/communicator';
import store from 'src/redux/store';
import { SetUserData } from 'src/redux/actions/user-actions';

export const GetUserStands = (): Promise<any> => {
  return new Promise((res, rej) => {
    const user = store && store.getState().user &&
      store.getState().user.user &&
      store.getState().user.user.id ?
      store.getState().user.user : null;
    if ( !user ) return rej(new Error('no user'));
    let url = `stands/?filter[owner]=${user.id}&include=pictures,panorama,`;
    url += 'video_links,phones,stand_booking_questions,stand_news,promotions,';
    url += 'highlighted_products,highlighted_services,highlighted_meals,';
    url += 'highlighted_real_estates,highlighted_vehicles,';
    url += 'city,city.state';
    APIGet(url, true)
      .then((response: any) => {
        const data = RebuildData(response).data;
        store.dispatch(SetUserData({
          userStands: data
        }));
        res(data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default GetUserStands;
