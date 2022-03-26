import { APIPost } from 'src/api/communicator';
import store from 'src/redux/store';
import { SetUserData } from 'src/redux/actions/user-actions';
import GetUser from 'src/api/api-sdk/get-user';
import GetUserProfile from 'src/api/api-sdk/get-user-profile';

interface payload {
  email: string;
  password: string;
}

const Login = ( payload: payload ): Promise<any> => {
  const data = {
    data: {
      email: payload.email,
      password: payload.password,
      type: 'login'
    }
  };
  return new Promise((res, rej) => {
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
