import {
  EXPO_DATA
} from 'src/constants/SystemValues';

export const SetUserData = ( data: any ): any => {
  return {
    type: EXPO_DATA,
    data: data
  };
};
