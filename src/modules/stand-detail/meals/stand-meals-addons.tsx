import React from 'react';
import 'src/modules/stand-detail/meals/stand-detail-product.scss';

const StandMealsAddons = (props: any): React.ReactElement => {
  return (
    <>
      {
        props.mealsAddons.data.map((item: any, index: number) => {
          return (
            <label key={index} className='StandMealsAddons grey-text text-darken-4'>
              <input type='checkbox' />
              <span>${item.attributes.price} - {item.attributes.title}</span>
            </label>
          );
        })
      }
    </>
  );
};

export default StandMealsAddons;
