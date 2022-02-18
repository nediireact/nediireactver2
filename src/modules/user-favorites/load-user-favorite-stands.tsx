import React, {
  useEffect
} from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import fetchData from 'src/modules/utils/fetch-data';
import SetUserFavoriteStands from 'src/redux/actions/user-favorite-stands';

const LoadUserFavoriteStands = (): React.ReactElement => {
  const userData = useSelector((state: any) => state.user);
  const user = userData && userData.user && userData.user.id ?
    userData.user : {};
  const dispatch = useDispatch();
  const standFields = 'name,img_logo,img_cover,slug,highlighted_meals,restaurant,average_rating';

  useEffect(() => {
    fetchData(`user-favorite-stands/?filter[user]=${user.id}&include=stand&fields=[Stand]=${standFields}`)
      .then((response: any) => {
        dispatch(SetUserFavoriteStands(response.data));
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [fetchData]);

  return <></>;
};

export default LoadUserFavoriteStands;
