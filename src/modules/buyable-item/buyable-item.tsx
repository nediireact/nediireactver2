import React from 'react';
import { Link } from 'react-router-dom';
import 'src/modules/buyable-item/buyable-item.scss';
import getMoneyFormat from 'src/modules/utils/money-formats';
import { ProductTypeConverter } from 'src/modules/utils/products-services';
import {
  GetStandFromInclude,
  GetBuyableItemName
} from 'src/modules/utils/products-services';

const BuyableItem = (props: any): React.ReactElement => {
  const item = props.item;
  const stand = GetStandFromInclude(item);
  const name = GetBuyableItemName(item);

  return (
    <div className={`BuyableItem ${props.fullWidth ? '' : 'col s12 m4'}`}>
      <Link to={`/empresa/${props.standSlug ? props.standSlug : stand ? stand.attributes.slug : ''}/${ProductTypeConverter(props.item.type)}/${item.attributes.slug}`} className='GenericCard'>
        <div className={`BuyableItem__image-container ${props.mini ? 'BuyableItem__image-container--mini' : ''}`}>
          <div className={`BuyableItem__image ${props.mini ? 'BuyableItem__image--mini' : ''}`}
            style={{backgroundImage: `url(${item.attributes.img_picture})`}}>
          </div>
          {
            item.attributes.discount && !props.mini ?
              <span className='BuyableItem__discount-label right-align red darken-1 white-text z-depth-1'>
                {`${item.attributes.discount}% de descuento`}
              </span> : null
          }
          {
            item.attributes.short_description ?
              <span className='BuyableItem__short-description grey-text text-darken-4'>
                {item.attributes.short_description}
              </span> : null
          }
        </div>
        <div className='BuyableItem__info'>
          {
            stand ?
              <span className='orange-text text-accent-4'>
                Vendido por {stand.attributes.name}
              </span> : null
          }
          <span className={`BuyableItem__name ${props.mini ? 'BuyableItem__name--mini' : ''} grey-text text-darken-4 truncate`}>
            {name}
          </span>
          <span className={`BuyableItem__price ${props.mini ? 'BuyableItem__price--mini' : ''} green-text text-darken-3`}>
            {getMoneyFormat(item.attributes.final_price)}
          </span>
          {
            item.attributes.discount ?
              <span className={`BuyableItem__discount ${props.mini ? 'BuyableItem__discount--mini' : ''} red-text text-lighten-2`}>
                {getMoneyFormat(item.attributes.price)}
              </span> : null
          }
        </div>
      </Link>
    </div>
  );
};

export default BuyableItem;
