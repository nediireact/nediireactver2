import {
  SET_SYSTEM_CONFIGURATIONS
} from 'src/constants/SystemValues';

const SetSystemConfigurations = ( data: any ): any => {
  return {
    type: SET_SYSTEM_CONFIGURATIONS,
    data: data
  };
};

export default SetSystemConfigurations;
