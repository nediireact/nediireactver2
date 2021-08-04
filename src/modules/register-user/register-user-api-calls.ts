import {
  APIPost,
  APIGet,
  APIPatch
} from 'src/api/communicator';

const loginPayload = {
  data: {
      email: '',
      password: '',
      type: 'login'
  }
};

const UpdateUserProfileAPICall = ( data: any ): Promise<any> => {
  return new Promise((res, rej) => {
    const userProfileData = {
      data: {
        type: 'UserProfile',
        id: data.data.id,
        attributes: {
          img_picture: data.data.attributes.img_picture
        }
      }
    };
    console.log('>> UserProfileAPICall', userProfileData);
    APIPatch('user-profile/', userProfileData, true, data.login.data.meta.access) // fix url
      .then((response: any) => {
        console.log('user-profile/', response);
        res(response);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

const GetUserProfileAPICall = ( data: any ): Promise<any> => {
  return new Promise((res, rej) => {
    const url = `user-profile/?filter[user]=${data.data.id}`;
    console.log('>> GetUserAPICall', url);
    APIGet(url, true, data.login.data.meta.access)
      .then((response: any) => {
        console.log('users/my-id', response);
        if ( data.data.attributes.img_picture ) {
          data.data.login = response.data;
          data.data.profile = response.data[0];
          console.log('Going to UpdateUserProfileAPICall', data);
          return res(UpdateUserProfileAPICall(data));
        }
        res(response);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

const LoginUserAPICall = ( data: any ): Promise<any> => {
  return new Promise((res, rej) => {
    loginPayload.data.email = data.data.attributes.email;
    loginPayload.data.password = data.data.attributes.password;
    APIPost('login/', loginPayload)
      .then((response: any) => {
        console.log('login/', response);
        if ( data.data.attributes.img_picture ) {
          data.data.id = response.data.id;
          data.data.login = response.data;
          console.log('Going to GetUserProfileAPICall', data);
          return res(GetUserProfileAPICall(data));
        }
        res(response);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

const RegisterUserAPICall = ( data: any, login = false ): Promise<any> => {
  return new Promise((res, rej) => {
    APIPost('users/', data)
      .then((response: any) => {
        console.log('users/', response);
        if ( login ) return LoginUserAPICall(data);
        res(response);
      })
      .catch((error: any) => {
        console.log('RegisterUserAPICall?', error);
        rej(error);
      });
  });
};

export default RegisterUserAPICall;
