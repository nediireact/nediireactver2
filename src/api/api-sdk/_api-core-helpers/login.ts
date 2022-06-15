import { APIPost } from 'src/api/communicator';
import store from 'src/redux/store';
import { SetUserData } from 'src/redux/actions/_core/user';
import GetUser from './get-user';
import GetUserProfile from './get-user-profile';

interface payloadInterface {
  email: string;
  password: string;
}

const Login = ( payload: payloadInterface ): Promise<any> => {
  return new Promise((res, rej) => {
    const data = {
      data: {
        type: 'login',
        email: payload.email,
        password: payload.password
      }
    };
    APIPost('login/', data)
      .then((response: any) => {
        store.dispatch(SetUserData({
          jwt: response.data.meta,
          user: response.data
        }));
        return GetUser();
      })
      .then(() => {
        return GetUserProfile();
      })
      .then((response: any) => {
        res(response);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default Login;
