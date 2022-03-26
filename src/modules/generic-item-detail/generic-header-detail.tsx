import React from 'react';
import SimpleAttribute from 'src/modules/simple-attribute/simple-attribute';
import Title from 'src/modules/title/title';
import { GetBuyableItemName } from 'src/modules/utils/products-services';
import GenericItemAddToFavoritesButton from 'src/modules/favorite-button/favorite-button';

const GenericHeaderDetail = (props: any): React.ReactElement => {
  const item = props.item;
  if ( !item || !item.attributes ) return <></>;
  const name = GetBuyableItemName(item);

  return (
    <div className='GenericItemDetail__header'>
      <GenericItemAddToFavoritesButton
        item={item}
        isLoading={props.isLoading}
        setIsLoading={props.setIsLoading} />
      <SimpleAttribute
        text='Ventas: '
        attribute={item.attributes.times_selled}
        size='small'/>
      {
        item.relationships &&
        item.relationships.classification &&
        item.relationships.classification.data &&
        item.relationships.classification.data.attributes ?
          <SimpleAttribute
            text='Categoria: '
            attribute={item.relationships.classification.data.attributes.name}
            size='small'/> : null
      }
      <Title text={name} fullWidth={true}/>
    </div>
  );
};

export default GenericHeaderDetail;
