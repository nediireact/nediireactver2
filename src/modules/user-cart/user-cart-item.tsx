import React from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { Link } from 'react-router-dom';
import 'src/modules/user-cart/user-cart-item.scss';
import getMoneyFormat from 'src/modules/utils/money-formats';
import { ProductTypeConverter } from 'src/modules/utils/products-services';
import StrongText from 'src/modules/strong-text/strong-text';
import {
  DeleteCartItem,
  UpdateCartItem
} from 'src/modules/user-cart/user-cart-api-calls';
import {
  UserCartDeleteItem,
  UserCartUpdateItem
} from 'src/redux/actions/user-cart-actions';
import {
  GetStandFromInclude,
  GetBuyableItemName
} from 'src/modules/utils/products-services';

const UserCartItem = (props: any): React.ReactElement => {
  const dispatch = useDispatch();
  const item = props.item;
  const cartItem = props.cartItem;
  const stand = GetStandFromInclude(item);
  const name = GetBuyableItemName(item);
  const userData = useSelector((state: any) => state.user);
  const user = userData && userData.user && userData.user.id ? userData.user : null;
  const isLoading = props.isLoading;
  const url = `/empresa/${props.standSlug ? props.standSlug : stand ? stand.attributes.slug : ''}/${ProductTypeConverter(props.item.type)}/${item.attributes.slug}`;
  const standURL = `/empresa/${props.standSlug ? props.standSlug : stand ? stand.attributes.slug : ''}`;
  const jwt = user && user.meta && userData.user.meta.access ?
    userData.user.meta.access : null;

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

  const updateItem = (cartItem: any) => {
    if ( !user || !user.id || !jwt ) return;
    props.setIsLoading(true);
    UpdateCartItem(cartItem, user, jwt)
      .then((data: any) => {
        console.log('data', data);
        props.setIsLoading(false);
        dispatch(UserCartUpdateItem(cartItem));
      })
      .catch((err) => {
        props.setIsLoading(false);
        console.log('Error', err);
      });
  };

  return (
    <div className='UserCartItem'>
      <div className='GenericCard UserCartItem__wrapper'>
        <Link to={url}
          className='UserCartItem__image'
          style={{ backgroundImage: `url(${item.attributes.img_picture})`}}></Link>
        <div className='UserCartItem__space'></div>
        <div className='UserCartItem__info'>
          <div className='UserCartItem__stand'>
          {
            stand ?
              <Link to={standURL} className='orange-text text-accent-4 left'>
                {stand.attributes.name}
              </Link> : null
          }
          </div>
          <Link to={url}><StrongText text={name} fullWidth={true} align='left' /></Link>
          <span className='grey-text text-darken-2 UserCartItem__short-description truncate'>
            {item.attributes.short_description}
          </span>
          <Link to={url} className='green-text text-darken-3 left UserCartItem__price'>
            {getMoneyFormat(item.attributes.final_price)}
          </Link>
          {
            item.attributes.discount ?
              <span className='red-text text-lighten-2 UserCartItem__discount'>
                {getMoneyFormat(item.attributes.price)}
              </span> : null
          }
        </div>
        <div className={`UserCartItem__action-buttons ${isLoading ? 'IsLoadingOpacity' : ''}`}>
          <div className='UserCartItem__delete-item red white-text z-depth-1'
            onClick={() => {
            if ( isLoading ) return;
            deleteItem(Number(cartItem.id));
          }}>Quitar</div>
          <div className='UserCartItem__quantity'>{cartItem.attributes.quantity}</div>
          <div className='UserCartItem__add-and-delete-buttons'>
            <div className={`UserCartItem__remove grey darken-2 white-text ${
              cartItem.attributes.quantity === 1 ? 'IsLoadingOpacity' : ''
            }`} onClick={() => {
              const quantity = Number(cartItem.attributes.quantity);
              if ( quantity < 2 || isLoading ) return;
              cartItem.attributes.quantity = quantity - 1;
              updateItem({
                data: {
                  type: 'UserCartBuyableItems',
                  id: cartItem.id,
                  attributes: {
                    quantity: cartItem.attributes.quantity
                  }
                }
              });
            }}>-</div>
            <div className='UserCartItem__add green white-text' onClick={() => {
              const quantity = Number(cartItem.attributes.quantity);
              if ( isLoading ) return;
              cartItem.attributes.quantity = quantity + 1;
              updateItem({
                data: {
                  type: 'UserCartBuyableItems',
                  id: cartItem.id,
                  attributes: {
                    quantity: cartItem.attributes.quantity
                  }
                }
              });
            }}>+</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCartItem;
