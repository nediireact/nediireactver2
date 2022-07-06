import {
  USER
} from 'src/constants/SystemValues';

export const SetUserData = ( data: any ): any => {
  return {
    type: USER,
    data: data
  };
};
