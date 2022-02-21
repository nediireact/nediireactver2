import React from 'react';
import StandDetailGallery from 'src/modules/stand-detail-gallery/stand-detail-gallery';

const GenericItemGallery = (props: any): React.ReactElement => {
  const item = props.item;
  if ( !item || !item.attributes || !item.relationships ) return <></>;

  return (
    <>
      {
        item.type === 'Meal' && item.relationships.meal_pictures &&
        item.relationships.meal_pictures.data ?
          <StandDetailGallery images={item.relationships.meal_pictures.data} /> : null
      }
      {
        item.type === 'Product' && item.relationships.product_pictures &&
        item.relationships.product_pictures.data ?
          <StandDetailGallery images={item.relationships.product_pictures.data} /> : null
      }
      {
        item.type === 'Service' && item.relationships.service_pictures &&
        item.relationships.service_pictures.data ?
          <StandDetailGallery images={item.relationships.service_pictures.data} /> : null
      }
      {
        item.type === 'Vehicle' && item.relationships.vehicle_pictures &&
        item.relationships.vehicle_pictures.data ?
          <StandDetailGallery images={item.relationships.vehicle_pictures.data} /> : null
      }
      {
        item.type === 'RealEstate' && item.relationships.real_estate_pictures &&
        item.relationships.real_estate_pictures.data ?
          <StandDetailGallery images={item.relationships.real_estate_pictures.data} /> : null
      }
    </>
  );
};

export default GenericItemGallery;
