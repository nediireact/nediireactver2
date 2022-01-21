import React from 'react';
import TextWhitIconInfo from 'src/modules/text-with-icon/text-with-icon-info';
import StrongText from 'src/modules/strong-text/strong-text';

const FoodTime = (): React.ReactElement => {
  return (
    <>
      <StrongText text='Tiempo de platillo'/>
      <TextWhitIconInfo
        text='Desayuno'
        colorIcon='orange-text'
        icon='brightness_7' />
      <TextWhitIconInfo
        text='Comida'
        colorIcon='cyan-text'
        icon='brightness_6' />
      <TextWhitIconInfo
        text='Cena'
        colorIcon='indigo-text'
        icon='brightness_2' />
    </>
  );
};

export default FoodTime;
