import React, {
  useEffect
} from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import fetchData from 'src/modules/utils/fetch-data';
import SetUserOrders from 'src/redux/actions/user-orders';

const LoadUserOrders = (): React.ReactElement => {
  const userData = useSelector((state: any) => state.user);
  const user = userData && userData.user && userData.user.id ? userData.user : null;
  if ( !user ) return <></>;
  const dispatch = useDispatch();
  const commonFields = 'name,img_picture,slug,stand,price,final_price,discount,short_description';
  const includesFields = 'order_items,order_items.product,order_items.service'; // Add the rest buyable items here and in favorites
  const fields = `&fields[Product]=${commonFields}&fields[Stand]=name,slug&fields[MealAddOn]=name,quantity,price`;

  useEffect(() => {
    fetchData(`user-orders/?filter[user]=${user.id}&include=${includesFields}${fields}`)
      .then((response: any) => {
        dispatch(SetUserOrders(response.data));
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [fetchData]);

  return <></>;
};

export default LoadUserOrders;
