import React from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  AddFavoriteItem,
  DeleteFavoriteItem,
  AddFavoriteStand,
  DeleteFavoriteStand
} from 'src/modules/user-favorites/user-favorites-api-calls';
import {
  UserFavoritesAddItem,
  UserFavoritesDeleteItem
} from 'src/redux/actions/user-favorite-items-actions';
import {
  UserFavoritesAddStand,
  UserFavoritesDeleteStand
} from 'src/redux/actions/user-favorite-stands-actions';
import {
  IsItAFavoriteItem,
  IsItAFavoriteStand
} from 'src/modules/user-favorites/is-item-in-user-favorites';
import 'src/modules/favorite-button/favorite-button.scss';
import { GetBuyableItemName } from 'src/modules/utils/products-services';
import SetGlobalAlertDialog from 'src/redux/actions/set-global-alert-dialog';

const getIsFavorite = ( userData: any, item: any ) => {
  if ( !userData || !item || !item.type || !item.id ) return null;
  if ( item.type === 'Stand' ) {
    if ( !userData.favoriteStands ) return null;
    return IsItAFavoriteStand(
      Number(item.id),
      item.type,
      userData.favoriteStands
    );
  }
  if ( !userData.favoriteItems ) return null;
  return IsItAFavoriteItem(
    Number(item.id),
    item.type,
    userData.favoriteItems
  );
};

const GenericItemAddToFavoritesButton = (props: any): React.ReactElement => {
  const item = props.item;
  if ( !item ) return <></>;
  const dispatch = useDispatch();
  const isLoading = props.isLoading;
  const userData = useSelector((state: any) => state.user);
  const user = userData && userData.user && userData.user.id ? userData.user : null;
  const isFavorite = getIsFavorite(userData, item);
  const name = item.type !== 'Stand' ? GetBuyableItemName(item) : null;

  const addItem = () => {
    if ( !user || !user.id || isLoading ) {
      dispatch(SetGlobalAlertDialog({
        active: true,
        dialog: 'missingLogin'
      }));
      return;
    }
    props.setIsLoading(true);
    const apiCaller = item.type === 'Stand' ? AddFavoriteStand : AddFavoriteItem;
    item.backup_name = name;
    apiCaller(item, user)
      .then((itemAdded: any) => {
        props.setIsLoading(false);
        if ( item.type === 'Stand' ) {
          dispatch(UserFavoritesAddStand(itemAdded));
        } else {
          dispatch(UserFavoritesAddItem(itemAdded));
        }
      })
      .catch((err) => {
        props.setIsLoading(false);
        console.log('Error', err.toString());
      });
  };

  const deleteItem = (id: number) => {
    if ( !user || !user.id || isLoading ) {
      dispatch(SetGlobalAlertDialog({
        active: true,
        dialog: 'missingLogin'
      }));
      return;
    }
    props.setIsLoading(true);
    const apiCaller = item.type === 'Stand' ? DeleteFavoriteStand : DeleteFavoriteItem;
    apiCaller(id)
      .then(() => {
        props.setIsLoading(false);
        if ( item.type === 'Stand' ) {
          dispatch(UserFavoritesDeleteStand(id));
        } else {
          dispatch(UserFavoritesDeleteItem(id));
        }
      })
      .catch((err) => {
        props.setIsLoading(false);
        console.log('Error', err);
      });
  };

  return (
    <>
    {
      isFavorite && isFavorite.id ?
        <div
          className={`material-icons red-text FavoriteButton ${isLoading ? 'IsLoadingOpacity' : ''}`}
          onClick={() => {
          if ( isLoading ) return;
          deleteItem(Number(isFavorite.id));
        }}>favorite</div> :
        <div
          className={`material-icons red-text FavoriteButton ${isLoading ? 'IsLoadingOpacity' : ''}`}
          onClick={() => {
          if ( isLoading ) return;
          addItem();
        }}>favorite_border</div>
    }
    </>
  );
};

export default GenericItemAddToFavoritesButton;
