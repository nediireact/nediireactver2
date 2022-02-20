import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import 'src/modules/user-cart/user-cart-item.scss';
import getMoneyFormat from 'src/modules/utils/money-formats';
import { ProductTypeConverter } from 'src/modules/utils/products-services';
import StrongText from 'src/modules/strong-text/strong-text';
import {
  DeleteCartItem
} from 'src/modules/user-cart/user-cart-api-calls';
import { UserCartDeleteItem } from 'src/redux/actions/user-cart';

const UserCartItem = (props: any): React.ReactElement => {
  const dispatch = useDispatch();
  const item = props.item;
  const stand = item.relationships && item.relationships.stand && item.relationships.stand.data &&
    item.relationships.stand.data.attributes ? item.relationships.stand.data.attributes.slug :
    props.standSlug ? props.standSlug : '';
  const name = item.type === 'Vehicle' ?
    `${item.attributes.year}
    ${item.relationships.model.data.relationships.make.data.attributes.name}
    ${item.relationships.model.data.attributes.name}` : item.attributes.name;
  const deleteItem = (id: number) => {
    DeleteCartItem(id)
      .then(() => {
        dispatch(UserCartDeleteItem(id));
      })
      .catch((err) => {
        console.log('Error', err);
      });
  };

  return (
    <div className='UserCartItem'>
      <div className='GenericCard UserCartItem__wrapper'>
        <Link to={`/empresa/${stand}/${ProductTypeConverter(props.item.type)}/${item.attributes.slug}`}
          className='UserCartItem__image'
          style={{ backgroundImage: `url(${item.attributes.img_picture})`}}></Link>
        <div className='UserCartItem__space'></div>
        <div className='UserCartItem__info'>
          <div className='UserCartItem__stand'>
          {
            item.relationships && item.relationships.stand &&
            item.relationships.stand.data && item.relationships.stand.data.attributes ?
              <span className='orange-text text-accent-4 left'>
                Vendido por {item.relationships.stand.data.attributes.name}
              </span> : null
          }
          </div>
          <StrongText text={name} fullWidth={true} align='left' />
          <span className='grey-text text-darken-2 UserCartItem__short-description truncate'>
            {item.attributes.short_description}
          </span>
          <span className='green-text text-darken-3 left UserCartItem__price'>
            {getMoneyFormat(item.attributes.final_price)}
          </span>
          {
            item.attributes.discount ?
              <span className='red-text text-lighten-2 UserCartItem__discount'>
                {getMoneyFormat(item.attributes.price)}
              </span> : null
          }
        </div>
        <div className='UserCartItem__action-buttons'>
          <div className='UserCartItem__delete-item red white-text z-depth-1' onClick={() => {
            deleteItem(Number(props.cartItem.id));
          }}>
            Quitar
          </div>
          <div className='UserCartItem__quantity'>
            {props.cartItem.attributes.quantity}
          </div>
          <div className='UserCartItem__add-and-delete-buttons'>
            <div className='UserCartItem__remove grey darken-2 white-text'>-</div>
            <div className='UserCartItem__add green white-text'>+</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCartItem;
