import { APIPost } from 'src/api/communicator';
import store from 'src/redux/store';
import UpdateStand from './update-stand';

export const AddStandPicture = (picture: string, stand: number, preExistentPictures: Array<any>): Promise<any> => {
  return new Promise((res, rej) => {
    const user = store && store.getState().user &&
      store.getState().user.user &&
      store.getState().user.user.id ?
      store.getState().user.user : null;
    if ( !user ) return rej(new Error('no user'));
    const data: any = {
      data: {
        type: 'StandPicture',
        attributes: {
          img_picture: picture
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
    APIPost('stand-pictures/', data)
      .then((response: any) => {
        preExistentPictures.push(response.data);
        return UpdateStand({
          id: stand,
          relationships: {
            pictures: {
              data: preExistentPictures
            }
          }
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

export default AddStandPicture;
