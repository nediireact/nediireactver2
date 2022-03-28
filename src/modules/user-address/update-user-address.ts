import {
  APIGet,
  APIPost,
  APIPatch
} from 'src/api/communicator';
import store from 'src/redux/store';
import GetUserAddress from 'src/api/api-sdk/get-user-address';

const CreateState = (state: any): Promise<any> => {
  return new Promise((res, rej) => {
    const data = {
      data: {
        type: 'State',
        attributes: {
          name: state
        },
        relationships: {
          country: {
            data: {
              type: 'Country',
              id: 1
            }
          }
        }
      }
    };
    APIPost('states/', data)
      .then((response: any) => {
        res(response);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

const CheckState = (state: any): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet(`states/?filter[search]=${state}`, true)
      .then((response: any) => {
        const states = response.data;
        if ( !states.length ) return CreateState(state);
        res(response.data[0]);
      })
      .then((response: any) => {
        res(response.data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

const CreateCity = (city: any, stateId: number): Promise<any> => {
  return new Promise((res, rej) => {
    const data = {
      data: {
        type: 'City',
        attributes: {
          name: city
        },
        relationships: {
          state: {
            data: {
              type: 'State',
              id: stateId
            }
          }
        }
      }
    };
    APIPost('cities/', data)
      .then((response: any) => {
        res(response);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

const CheckCity = (city: any, stateId: number): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet(`cities/?filter[search]=${city}`, true)
      .then((response: any) => {
        const cities = response.data;
        if ( !cities.length ) return CreateCity(city, stateId);
        res(response.data[0]);
      })
      .then((response: any) => {
        res(response.data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export const UpdateUserAddress = (address: any): Promise<any> => {
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
        APIPatch(`user-address/${address.id}/`, data)
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

export default UpdateUserAddress;
