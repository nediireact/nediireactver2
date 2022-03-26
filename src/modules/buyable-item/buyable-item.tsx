import React, {
  useState
} from 'react';
import { Link } from 'react-router-dom';
import 'src/modules/buyable-item/buyable-item.scss';
import getMoneyFormat from 'src/modules/utils/money-formats';
import { ProductTypeConverter } from 'src/modules/utils/products-services';
import {
  GetStandFromInclude,
  GetBuyableItemName
} from 'src/modules/utils/products-services';
import GenericItemAddToFavoritesButton from 'src/modules/favorite-button/favorite-button';

const BuyableItem = (props: any): React.ReactElement => {
  const item = props.item;
  if ( !item ) return <></>;
  const [isLoading, setIsLoading] = useState(false);
  const stand = GetStandFromInclude(item);
  const name = GetBuyableItemName(item);
  const url = `/empresa/${props.standSlug ? props.standSlug : stand ? stand.attributes.slug : ''}/${ProductTypeConverter(props.item.type)}/${item.attributes.slug}`;
  const standURL = `/empresa/${props.standSlug ? props.standSlug : stand ? stand.attributes.slug : ''}`;

  return (
    <div className={`BuyableItem ${props.fullWidth ? '' : 'col s12 m4'}`}>
      <div className='GenericCard'>
        <Link to={url} className={`BuyableItem__image-container ${props.mini ? 'BuyableItem__image-container--mini' : ''}`}>
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
        </Link>
        <div className='BuyableItem__info'>
          <GenericItemAddToFavoritesButton
            item={item}
            isLoading={isLoading}
            setIsLoading={setIsLoading} />
          {
            stand ?
              <Link to={standURL} className='orange-text text-accent-4 truncate'>
                {stand.attributes.name}
              </Link> : null
          }
          <Link to={url} className={`BuyableItem__name ${props.mini ? 'BuyableItem__name--mini' : ''} grey-text text-darken-4 truncate`}>
            {name}
          </Link>
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
      </div>
    </div>
  );
};

export default BuyableItem;
