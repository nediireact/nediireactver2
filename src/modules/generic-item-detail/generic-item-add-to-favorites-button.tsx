import React from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  AddCartItem,
  DeleteCartItem
} from 'src/modules/user-cart/user-cart-api-calls';
import TextWithIcon from 'src/modules/text-with-icon/text-with-icon';
import { UserCartAddItem } from 'src/redux/actions/user-cart-actions';
import { UserCartDeleteItem } from 'src/redux/actions/user-cart-actions';
import { IsItAFavoriteItem } from 'src/modules/user-favorites/is-item-in-user-favorites';
import { GetBuyableItemName } from 'src/modules/utils/products-services';

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
    if ( !user || !user.id || !jwt ) return;
    props.setIsLoading(true);
    item.backup_name = name;
    AddCartItem(item, user, jwt)
      .then((itemAdded: any) => {
        props.setIsLoading(false);
        dispatch(UserCartAddItem(itemAdded));
      })
      .catch((err) => {
        props.setIsLoading(false);
        console.log('Error', err.toString());
      });
  };

  const deleteItem = (id: number) => {
    props.setIsLoading(true);
    DeleteCartItem(id)
      .then(() => {
        props.setIsLoading(false);
        dispatch(UserCartDeleteItem(id));
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
        <div className={`GenericItemDetail__add-item-to-cart ${isLoading ? 'IsLoadingOpacity' : ''}`} onClick={() => {
          if ( isLoading ) return;
          deleteItem(Number(isFavorite.id));
        }}>
          <TextWithIcon
            color_icon='red-text'
            icon='cancel'
            text_color='grey-text text-darken-4'
            text='Eliminar de favorito' />
        </div> :
        <div className={`GenericItemDetail__add-item-to-cart ${isLoading ? 'IsLoadingOpacity' : ''}`} onClick={addItem}>
          <TextWithIcon
            color_icon='cyan-text'
            icon='add_shopping_cart'
            text_color='grey-text text-darken-4'
            text='Agregar a favoritos' />
        </div>
    }
    </>
  );
};

export default GenericItemAddToFavoritesButton;
