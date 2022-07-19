import {
  STAND_DATA
} from 'src/constants/SystemValues';

const setStandData = ( data: any ): any => {
  return {
    type: STAND_DATA,
    data: data
  };
};

export default setStandData;
