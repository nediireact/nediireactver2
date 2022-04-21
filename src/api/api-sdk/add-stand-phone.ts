import { APIPost } from 'src/api/communicator';
import store from 'src/redux/store';
import UpdateStand from './update-stand';

export const AddStandPhone = (phone: string, stand: number, preExistentPhones: Array<any>): Promise<any> => {
  return new Promise((res, rej) => {
    const user = store && store.getState().user &&
      store.getState().user.user &&
      store.getState().user.user.id ?
      store.getState().user.user : null;
    if ( !user ) return rej(new Error('no user'));
    const data: any = {
      data: {
        type: 'StandPhone',
        attributes: {
          phone: phone
        },
        relationships: {
          stand: {
            data: {
              type: 'Stand',
              id: stand
            }
          }
        }
      }
    };
    APIPost('stand-phones/', data)
      .then((response: any) => {
        preExistentPhones.push(response.data);
        return UpdateStand({
          id: stand,
          phones: preExistentPhones
        });
      })
      .then((response: any) => {
        res(response.data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default AddStandPhone;
