import React from 'react';
import 'src/modules/item-price/item-price.scss';

export const TextPriceLine = (props: any): React.ReactElement => {
  return (
    <span className={`TextItemPrice--${props.style}`}>{props.text}</span>
  );
};

export const TextPriceBlock = (props: any): React.ReactElement => {
  return (
    <div className={`TextItemPrice--${props.style}`}>{props.text}</div>
  );
};
