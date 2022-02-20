import React, {
  useEffect
} from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import fetchData from 'src/modules/utils/fetch-data';
import SetUserFavoriteItems from 'src/redux/actions/user-favorite-items';

const LoadUserFavoriteItems = (): React.ReactElement => {
  const userData = useSelector((state: any) => state.user);
  const user = userData && userData.user && userData.user.id ?
    userData.user : {};
  const dispatch = useDispatch();
  const commonFields = 'name,img_picture,slug,stand,price,final_price,discount,short_description';
  let url = `user-favorite-items/?filter[user]=${user.id}&include=`;
  url += 'product,product.stand,';
  url += 'service,service.stand,';
  url += 'meal,meal.stand,';
  url += 'meal_addons,';
  url += 'real_estate,real_estate.stand,';
  url += 'vehicle,vehicle.stand,vehicle.model,vehicle.model.make';
  url += `&fields[Product]=${commonFields}`;
  url += `&fields[Service]=${commonFields}`;
  url += `&fields[Meal]=${commonFields}`;
  url += '&fields[MealAddOn]=name,quantity,price';
  url += `&fields[RealEstate]=${commonFields}`;
  url += `&fields[Vehicle]=${commonFields},model,model.make`;
  url += '&fields[Stand]=name,slug';

  useEffect(() => {
    fetchData(url)
      .then((response: any) => {
        dispatch(SetUserFavoriteItems(response.data));
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [fetchData]);

  return <></>;
};

export default LoadUserFavoriteItems;