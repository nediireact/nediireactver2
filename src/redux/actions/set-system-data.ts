import {
  SYSTEM_DATA
} from 'src/constants/SystemConstants';

const SetSystemData = ( data: any ): any => {
  return {
    type: SYSTEM_DATA,
    data: data
  };
};

export default SetSystemData;
