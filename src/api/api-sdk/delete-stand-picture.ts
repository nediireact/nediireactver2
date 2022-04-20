import { APIDelete } from 'src/api/communicator';
import store from 'src/redux/store';
import UpdateStand from './update-stand';

export const DeleteStandPicture = (pictureId: number, standId: number, preExistentPictures: Array<any>): Promise<any> => {
  return new Promise((res, rej) => {
    const user = store && store.getState().user &&
      store.getState().user.user &&
      store.getState().user.user.id ?
      store.getState().user.user : null;
    if ( !user ) return rej(new Error('no user'));
    APIDelete(`stand-pictures/${pictureId}/`)
      .then(() => {
        const pictureToDelete = preExistentPictures.filter((i: any) => Number(i.id) === pictureId);
        if ( pictureToDelete.length ) {
          const index = preExistentPictures.indexOf(pictureToDelete[0]);
          preExistentPictures.splice(index, 1);
        }
        return UpdateStand({
          id: standId,
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

export default DeleteStandPicture;
