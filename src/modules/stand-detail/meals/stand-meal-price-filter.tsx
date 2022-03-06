// DEPRECATED

import React, {
  useRef
} from 'react';

const PriceComponent = (props: any): React.ReactElement => {
  const sliderRef: any = useRef(null);
  const maxPrice = props.maxPrice;

  return (
    <>
      <span className='StandFilters__name'>Rango de precio</span>
      <span>0 - {maxPrice}</span>
      <div className='StandFilters__price' ref={sliderRef}></div>
    </>
  );
};

export default PriceComponent;
