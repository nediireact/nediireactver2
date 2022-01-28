import {
  EXPO_DATA
} from 'src/constants/SystemConstants';

const SetExpoData = ( data: any ): any => {
  return {
    type: EXPO_DATA,
    data: data
  };
};

export default SetExpoData;
