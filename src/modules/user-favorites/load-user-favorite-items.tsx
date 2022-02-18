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

  useEffect(() => {
    fetchData(`user-favorite-items/?filter[user]=${user.id}&include=product,product.stand&fields[Product]=${commonFields}&fields[Stand]=name,slug`)
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
