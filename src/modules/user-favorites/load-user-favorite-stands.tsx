import React, {
  useEffect
} from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import fetchData from 'src/modules/utils/fetch-data';
import { SetUserFavoriteStands } from 'src/redux/actions/user-favorite-stands-actions';

const LoadUserFavoriteStands = (): React.ReactElement => {
  const userData = useSelector((state: any) => state.user);
  const user = userData && userData.user && userData.user.id ? userData.user : null;
  const dispatch = useDispatch();
  const includes = 'stand,stand.city,stand.city.state,stand.owner';
  const standFields = 'name,img_logo,img_cover,slug,highlighted_meals,restaurant,average_rating';
  const cityFields = 'name,state';
  const stateFields = 'name';

  useEffect(() => {
    if ( user ) {
      fetchData(`user-favorite-stands/?filter[user]=${user.id}&include=${includes}&fields=[Stand]=${standFields}&fields[City]=${cityFields}&fields[State]=${stateFields}`)
        .then((response: any) => {
          dispatch(SetUserFavoriteStands(response.data));
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [fetchData]);

  return <></>;
};

export default LoadUserFavoriteStands;
