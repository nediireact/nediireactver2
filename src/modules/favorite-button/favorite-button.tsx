import React from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  AddFavoriteItem,
  DeleteFavoriteItem
} from 'src/modules/user-favorites/user-favorites-api-calls';
import {
  UserFavoritesAddItem,
  UserFavoritesDeleteItem
} from 'src/redux/actions/user-favorite-items-actions';
import { IsItAFavoriteItem } from 'src/modules/user-favorites/is-item-in-user-favorites';
import 'src/modules/favorite-button/favorite-button.scss';
import { GetBuyableItemName } from 'src/modules/utils/products-services';
import SetGlobalAlertDialog from 'src/redux/actions/set-global-alert-dialog';

const GenericItemAddToFavoritesButton = (props: any): React.ReactElement => {
  const item = props.item;
  if ( !item ) return <></>;
  const dispatch = useDispatch();
  const isLoading = props.isLoading;
  const userData = useSelector((state: any) => state.user);
  const user = userData && userData.user && userData.user.id ? userData.user : null;
  const isFavorite = user && userData && userData.favoriteItems && userData.favoriteItems.length ?
    IsItAFavoriteItem(
      Number(item.id),
      item.type,
      userData.favoriteItems
    ) : null;
  const jwt = user && user.meta && userData.user.meta.access ?
    userData.user.meta.access : null;
  const name = GetBuyableItemName(item);

  const addItem = () => {
    if ( !user || !user.id || !jwt || isLoading ) {
      dispatch(SetGlobalAlertDialog({
        active: true,
        dialog: 'missingLogin'
      }));
      return;
    }
    props.setIsLoading(true);
    item.backup_name = name;
    AddFavoriteItem(item, user, jwt)
      .then((itemAdded: any) => {
        props.setIsLoading(false);
        dispatch(UserFavoritesAddItem(itemAdded));
      })
      .catch((err) => {
        props.setIsLoading(false);
        console.log('Error', err.toString());
      });
  };

  const deleteItem = (id: number) => {
    if ( !user || !user.id || !jwt || isLoading ) {
      dispatch(SetGlobalAlertDialog({
        active: true,
        dialog: 'missingLogin'
      }));
      return;
    }
    props.setIsLoading(true);
    DeleteFavoriteItem(id)
      .then(() => {
        props.setIsLoading(false);
        dispatch(UserFavoritesDeleteItem(id));
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
