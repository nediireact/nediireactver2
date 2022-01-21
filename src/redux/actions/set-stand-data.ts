import {
  STAND_DATA
} from 'src/constants/SystemConstants';

const setStandData = ( data: any ): any => {
  return {
    type: STAND_DATA,
    data: data
  };
};

export default setStandData;
