import React from 'react';
import { Link } from 'react-router-dom';
import 'src/modules/buyable-item/buyable-item.scss';

const BuyableItem = (props: any): React.ReactElement => {
  const item = props.item;

  return (
    <Link
      to={`/stand/${props.standSlug}/meals/${item.slug}`}
      className={`BuyableItem ${props.size}`}>
      <div
        className={`BuyableItem__card ${props.colorCard ? props.colorCard : 'white'}`}
        style={{
          borderRadius: props.borderRadius,
          border: `solid ${props.borderSize}`
        }} >
        <div
          className='BuyableItem__image'
          style={{
            backgroundImage: `url(${item.img_picture})`,
            borderRadius: `${props.imageRadius}`
          }}>
          {
            item.discount ?
              <span className='BuyableItem__discount right-align red darken-1 white-text z-depth-1'>
                {`${item.discount}% de descuento`}
              </span> : null
          }
        </div>
        <span className='BuyableItem__price grey-text text-darken-4'>
          ${item.final_price}
        </span>
        <span
          className={`BuyableItem__title 
            ${props.truncate ? 'truncate' : ''}
            ${props.align ? props.align : ''}
            ${props.colorTitle ? props.colorTitle : 'grey-text text-darken-3'}`}>
            {item.title}
        </span>
      </div>
    </Link>
  );
};

export default BuyableItem;
