import { APIPatch } from 'src/api/communicator';
import store from 'src/redux/store';
import GetUserProfile from 'src/api/api-sdk/get-user-profile';

interface payload {
  img_picture?: string;
  is_seller?: boolean;
  newsletter?: boolean;
  promotions?: boolean;
  biography?: string;
  owner_position?: string;
  owner_position_description?: string;
  owner_phone?: string;
  owner_office_phone?: string;
  owner_email?: string;
  owner_whatsapp?: string;
  owner_address?: string;
}

const UpdateUserProfile = ( payload: payload ): Promise<any> => {
  const userProfileId = store && store.getState().user &&
    store.getState().user.userProfile &&
    store.getState().user.userProfile.id ?
    store.getState().user.userProfile.id : null;
  const data = {
    data: {
      id: userProfileId,
      type: 'UserProfile',
      attributes: payload
    }
  };
  return new Promise((res, rej) => {
    APIPatch(`user-profile/${userProfileId}/`, data)
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

export default UpdateUserProfile;
