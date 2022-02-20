import {
  USER_ORDERS
} from 'src/constants/SystemConstants';

export const SetUserOrders = ( data: any ): any => {
  return {
    type: USER_ORDERS,
    data: data
  };
};

export default SetUserOrders;
