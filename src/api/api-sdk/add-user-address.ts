import { APIPost } from 'src/api/communicator';
import store from 'src/redux/store';
import GetUserAddress from 'src/api/api-sdk/get-user-address';
import CheckState from 'src/api/api-sdk/check-state';
import CheckCity from 'src/api/api-sdk/check-city';

export const AddUserAddress = (address: any): Promise<any> => {
  return new Promise((res, rej) => {
    const user = store && store.getState().user &&
      store.getState().user.user &&
      store.getState().user.user.id ?
      store.getState().user.user : null;
    if ( !user ) return rej(new Error('no user'));
    const data: any = {
      data: {
        id: address.id,
        type: 'UserAddress',
        attributes: address,
        relationships: {
          user: {
            data: {
              type: 'User',
              id: user.id
            }
          },
          city: {
            data: {
              type: 'City',
              id: 0
            }
          }
        }
      }
    };
    CheckState(address.state)
      .then((response: any) => {
        return CheckCity(address.city, response.id);
      })
      .then((response: any) => {
        data.data.relationships.city.data.id = response.id;
        APIPost('user-address/', data)
          .then(() => {
            return GetUserAddress();
          })
          .then(() => {
            res(true);
          })
          .catch((error: any) => {
            rej(error);
          });
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default AddUserAddress;
