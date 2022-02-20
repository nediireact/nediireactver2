import {
  APIDelete,
  APIPost
} from 'src/api/communicator';

export const DeleteCartItem = ( id: number ): Promise<any> => {
  return new Promise((res, rej) => {
    const url = `user-cart-items/${id}`;
    APIDelete(url)
      .then((response: any) => {
        res(response);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export const AddCartItem = ( data: any, jwt: string ): Promise<any> => {
  return new Promise((res, rej) => {
    APIPost('user-cart-items/', data, true, jwt)
      .then((response: any) => {
        res(response.data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};
