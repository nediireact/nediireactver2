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
import {
  UserCartAddItem,
  UserCartDeleteItem
} from 'src/redux/actions/user-cart-actions';
import { IsItACartItem } from 'src/modules/user-cart/is-item-in-user-cart';
import { GetBuyableItemName } from 'src/modules/utils/products-services';
import SetGlobalAlertDialog from 'src/redux/actions/set-global-alert-dialog';

const GenericItemAddToCartButton = (props: any): React.ReactElement => {
  const item = props.item;
  if ( !item ) return <></>;
  const isLoading = props.isLoading;
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user);
  const user = userData && userData.user && userData.user.id ? userData.user : null;
  const isInUserCart = user && userData && userData.cart && userData.cart.length ?
    IsItACartItem(
      Number(item.id),
      item.type,
      userData.cart
    ) : null;
  const name = GetBuyableItemName(item);

  const addItem = () => {
    if ( !user || !user.id || isLoading ) {
      dispatch(SetGlobalAlertDialog({
        active: true,
        dialog: 'missingLogin'
      }));
      return;
    }
    props.setIsLoading(true);
    item.backup_name = name;
    AddCartItem(item, user)
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
    if ( !user || !user.id || isLoading ) {
      dispatch(SetGlobalAlertDialog({
        active: true,
        dialog: 'missingLogin'
      }));
      return;
    }
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
      isInUserCart && isInUserCart.id ?
        <div className={`GenericItemDetail__add-item-to-cart ${isLoading ? 'IsLoadingOpacity' : ''}`} onClick={() => {
          if ( isLoading ) return;
          deleteItem(Number(isInUserCart.id));
        }}>
          <TextWithIcon
            color_icon='red-text'
            icon='cancel'
            text_color='grey-text text-darken-4'
            text='Eliminar del carrito' />
        </div> :
        <div className={`GenericItemDetail__add-item-to-cart ${isLoading ? 'IsLoadingOpacity' : ''}`} onClick={() => {
          if ( isLoading ) return;
          addItem();
        }}>
          <TextWithIcon
            color_icon='cyan-text'
            icon='add_shopping_cart'
            text_color='grey-text text-darken-4'
            text='Agregar al carrito' />
        </div>
    }
    </>
  );
};

export default GenericItemAddToCartButton;
