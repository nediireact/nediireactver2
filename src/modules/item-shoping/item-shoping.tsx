import React from 'react';
import TextWithIcon from 'src/modules/text-with-icon/text-with-icon';

const ItemShoping = (): React.ReactElement => {
  return (
    <div>
      <TextWithIcon
        color_icon='cyan-text'
        icon='add_shopping_cart'
        text_color='grey-text text-darken-4'
        text='Agregar'/>
      <TextWithIcon
        color_icon='cyan-text'
        icon='credit_card'
        text_color='grey-text text-darken-4'
        text='Comprar'/>
    </div>
  );
};

export default ItemShoping;
