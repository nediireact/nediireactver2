import React from 'react';

const StandMealsAddons = (props: any): React.ReactElement => {
  return (
    <>
      {
        props.mealsAddons.data.map((item: any, index: number) => {
          return (
            <label key={index} className='StandMealsAddons grey-text text-darken-4'>
              <input type='checkbox' />
              <span>${item.attributes.price} - {item.attributes.name}</span>
            </label>
          );
        })
      }
    </>
  );
};

export default StandMealsAddons;
