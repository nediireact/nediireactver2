import React from 'react';
import 'src/modules/item-price/item-price.scss';
import getMoneyFormat from 'src/modules/utils/money-formats';

export const TextPriceLine = (props: any): React.ReactElement => {
  return (
    <span className={`TextItemPrice--${props.style}`}>
      {
        props.style === 'discount-off' ?
          `${props.text}% OFF` : getMoneyFormat(props.text)
      }
    </span>
  );
};

export const TextPriceBlock = (props: any): React.ReactElement => {
  return (
    <div className={`TextItemPrice--${props.style}`}>
      {
        props.style === 'discount-off' ?
          `${props.text}% OFF` : getMoneyFormat(props.text)
      }
    </div>
  );
};
