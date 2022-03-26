// Deprecated

import React from 'react';
import TextWithIconInfo from 'src/modules/text-with-icon/text-with-icon-info';
import StrongText from 'src/modules/strong-text/strong-text';

const FoodTime = (): React.ReactElement => {
  return (
    <div>
       <StrongText text='Tiempo de platillo'/>
        <TextWithIconInfo
          text='Desayuno'
          colorIcon='orange-text'
          icon='brightness_7' />
        <TextWithIconInfo
          text='Comida'
          colorIcon='cyan-text'
          icon='brightness_6' />
        <TextWithIconInfo
          text='Cena'
          colorIcon='indigo-text'
          icon='brightness_2' />
    </div>
  );
};

export default FoodTime;
