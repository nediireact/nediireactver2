import {
  APIPatch
} from 'src/api/communicator';
import store from 'src/redux/store';
import GetUser from 'src/api/api-sdk/get-user';

interface payload {
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
}

const UpdateUser = ( payload: payload ): Promise<any> => {
  const userId = store && store.getState().user &&
    store.getState().user.user &&
    store.getState().user.user.id ?
    store.getState().user.user.id : null;
  const data = {
    data: {
      id: userId,
      type: 'User',
      attributes: payload
    }
  };
  return new Promise((res, rej) => {
    APIPatch(`users/${userId}/`, data)
      .then(() => {
        return GetUser();
      })
      .then((response: any) => {
        res(response);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default UpdateUser;
