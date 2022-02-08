import React from 'react';
import TextWhitIconInfo from 'src/modules/text-with-icon/text-with-icon-info';
import StrongText from 'src/modules/strong-text/strong-text';
import TextWithIcon from 'src/modules/text-with-icon/text-with-icon';

const RealEstateAttributes = (props: any): React.ReactElement => {
  return (
    <>
      {
        props.item.attributes.state ?
          <TextWhitIconInfo
            colorIcon='cyan-text'
            icon='check'
            text={`Estado: ${props.item.attributes.state}`} /> : null
      }
      {
        props.item.attributes.year ?
          <TextWhitIconInfo
            colorIcon='cyan-text'
            icon='check'
            text={`Año de construcción: ${props.item.attributes.year}`} /> : null
      }
      {
        props.item.attributes.area ?
          <TextWhitIconInfo
            colorIcon='cyan-text'
            icon='check'
            text={`Área de construcción: ${props.item.attributes.area} m2`} /> : null
      }
      {
        props.item.attributes.num_of_bedrooms ?
          <TextWhitIconInfo
            colorIcon='cyan-text'
            icon='check'
            text={`Numero de recamaras: ${props.item.attributes.num_of_bedrooms}`} /> : null
      }
      {
        props.item.attributes.num_of_bathrooms ?
          <TextWhitIconInfo
            colorIcon='cyan-text'
            icon='check'
            text={`Numero de baños: ${props.item.attributes.num_of_bathrooms}`} /> : null
      }
      {
        props.item.attributes.num_of_parking_spots ?
          <TextWhitIconInfo
            colorIcon='cyan-text'
            icon='check'
            text={`Numero de cajones estacionamientos: ${props.item.attributes.num_of_parking_spots}`} /> : null
      }
      {
        props.item.attributes.support_email || props.item.attributes.support_phone ?
        <StrongText text='Consultas' /> : null
      }
      {
        props.item.attributes.support_email ?
          <TextWithIcon
            link={`mailto:${props.item.attributes.support_email}`}
            truncate={true}
            color_icon='red-text'
            icon='mail_outline'
            text={`Email de Soporte: ${props.item.attributes.support_email}`} /> : null
      }
      {
        props.item.attributes.support_phone ?
          <TextWithIcon
            link={`tel:${props.item.attributes.support_phone}`}
            truncate={true}
            color_icon='green-text'
            icon='call'
            text={`Telefono de soporte: ${props.item.attributes.support_phone}`} /> : null
      }
    </>
  );
};

export default RealEstateAttributes;
