import React from 'react';
import TextWhitIconInfo from 'src/modules/text-with-icon/text-with-icon-info';
import StrongText from 'src/modules/strong-text/strong-text';

interface FoodTimeInterface {
  is_breakfast?: boolean;
  is_meal?: boolean;
  is_dinner?: boolean;
}

const FoodTime = (props: FoodTimeInterface): React.ReactElement => {
  return (
    <>
      <StrongText text='Tiempo de platillo'/>
      {
        props.is_breakfast ?
          <TextWhitIconInfo
            text='Desayuno'
            colorIcon='orange-text'
            icon='brightness_7' /> : null
      }
      {
        props.is_meal ?
          <TextWhitIconInfo
            text='Comida'
            colorIcon='cyan-text'
            icon='brightness_6' /> : null
      }
      {
        props.is_dinner ?
          <TextWhitIconInfo
            text='Cena'
            colorIcon='indigo-text'
            icon='brightness_2' /> : null
      }
    </>
  );
};

export default FoodTime;
