import {
  UPDATE_STAND_AVERAGE_RATING
} from 'src/constants/SystemConstants';

const UpdateStandAverageRating = ( data: any ): any => {
  return {
    type: UPDATE_STAND_AVERAGE_RATING,
    data: data
  };
};

export default UpdateStandAverageRating;
