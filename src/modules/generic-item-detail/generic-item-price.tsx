import React from 'react';
import {
  TextPriceLine,
  TextPriceBlock
} from 'src/modules/item-price/item-price';

const GenericItemPrice = (props: any): React.ReactElement => {
  return (
    <>
      {props.discount > 0 ? <TextPriceBlock text={`${props.price}`} style='discount'/> : null}
      <TextPriceLine text={`${props.discount > 0 ? props.final_price : props.price}`} style='price'/>
      {props.discount > 0 ? <TextPriceLine text={`${props.discount}`} style='discount-off'/> : null}
    </>
  );
};

export default GenericItemPrice;
