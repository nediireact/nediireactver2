import React from 'react';
import { Link } from 'react-router-dom';
import 'src/modules/buyable-item/buyable-item.scss';
import getMoneyFormat from 'src/modules/utils/money-formats';
import { ProductTypeConverter } from 'src/modules/utils/products-services';

const BuyableItem = (props: any): React.ReactElement => {
  const item = props.item;
  const stand = item.relationships && item.relationships.stand && item.relationships.stand.data &&
  item.relationships.stand.data.attributes ? item.relationships.stand.data.attributes.slug : '';
  const name = item.type === 'Vehicle' ?
    `${item.attributes.year}
    ${item.relationships.model.data.relationships.make.data.attributes.name}
    ${item.relationships.model.data.attributes.name}` : item.attributes.name;

  return (
    <div className={`BuyableItem ${props.fullWidth ? '' : 'col s12 m4'}`}>
      <Link to={`/empresa/${stand}/${ProductTypeConverter(props.item.type)}/${item.attributes.slug}`} className='GenericCard'>
        <div className='BuyableItem__image-container'>
          <div className='BuyableItem__image'
            style={{backgroundImage: `url(${item.attributes.img_picture})`}}>
          </div>
          {
            item.attributes.discount ?
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
          <span className='BuyableItem__name grey-text text-darken-4 truncate'>
            {name}
          </span>
          <span className='BuyableItem__price grey-text text-darken-4'>
            {getMoneyFormat(item.attributes.final_price)}
          </span>
          {
            item.attributes.discount ?
              <span className='BuyableItem__discount green-text text-darken-3'>
                {getMoneyFormat(item.attributes.price)}
              </span> : null
          }
        </div>
      </Link>
    </div>
  );
};

export default BuyableItem;
