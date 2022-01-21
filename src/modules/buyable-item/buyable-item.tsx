import React from 'react';
import { Link } from 'react-router-dom';
import 'src/modules/buyable-item/buyable-item.scss';
import getMoneyFormat from 'src/modules/utils/money-formats';

const BuyableItem = (props: any): React.ReactElement => {
  const item = props.item;

  return (
    <div className='BuyableItem col s12 m4'>
      <Link to={`/empresa/${props.standSlug}/${props.type}/${item.slug}`} className='GenericCard'>
        <div className='BuyableItem__image-container'>
          <div className='BuyableItem__image'
            style={{backgroundImage: `url(${item.img_picture})`}}>
          </div>
          {
            item.discount ?
              <span className='BuyableItem__discount-label right-align red darken-1 white-text z-depth-1'>
                {`${item.discount}% de descuento`}
              </span> : null
          }
          {
            item.short_description ?
              <span className='BuyableItem__short-description grey-text text-darken-4'>
                {item.short_description}
              </span> : null
          }
        </div>
        <div className='BuyableItem__info'>
          <span className='BuyableItem__name grey-text text-darken-4 truncate'>
            {item.name}
          </span>
          <span className='BuyableItem__price grey-text text-darken-4'>
            {getMoneyFormat(item.final_price)}
          </span>
          {
            item.discount ?
              <span className='BuyableItem__discount green-text text-darken-3'>
                {getMoneyFormat(item.price)}
              </span> : null
          }
        </div>
      </Link>
    </div>
  );
};

export default BuyableItem;
