import React from 'react';
import TextWhitIconInfo from 'src/modules/text-with-icon/text-with-icon-info';
import StrongText from 'src/modules/strong-text/strong-text';
import TextWithIcon from 'src/modules/text-with-icon/text-with-icon';

const VehicleAttributes = (props: any): React.ReactElement => {
  return (
    <>
      {
        props.item.attributes.state ?
          <TextWhitIconInfo colorIcon='cyan-text' icon='check' text={`Estado: ${props.item.attributes.state}`} /> : null
      }
      {
        props.item.attributes.year ?
         <TextWhitIconInfo colorIcon='cyan-text' icon='check' text={`Año: ${props.item.attributes.year}`} /> : null
      }
      {
        props.item.attributes.doors ?
          <TextWhitIconInfo colorIcon='cyan-text' icon='check' text={`Puertas: ${props.item.attributes.doors}`} /> : null
      }
      {
        props.item.attributes.gas ?
         <TextWhitIconInfo colorIcon='cyan-text' icon='ev_station' text='Combustible: Gasolina' /> : null
      }
      {
        props.item.attributes.diesel ?
          <TextWhitIconInfo colorIcon='cyan-text' icon='ev_station' text='Combustible: Diesel' /> : null
      }
      {
        props.item.attributes.electric ?
        <TextWhitIconInfo colorIcon='cyan-text' icon='flash_auto' text='Sistema: Electrico' /> : null
      }
      {
        props.item.attributes.automatic ?
          <TextWhitIconInfo colorIcon='cyan-text' icon='check' text='Transmisión: Automatica' /> :
          <TextWhitIconInfo colorIcon='cyan-text' icon='check' text='Transmisión: Manual' />
      }
      {
        props.item.attributes.four_wd ?
          <TextWhitIconInfo colorIcon='cyan-text' icon='check' text='Tracción: 4x4' /> : null
      }
      {
        props.item.attributes.all_wd ?
          <TextWhitIconInfo colorIcon='cyan-text' icon='check' text='Tracción: Todo Terreno' /> : null
      }
      {
        props.item.attributes.warranty_days && props.item.attributes.warranty_days > 0 ?
          <TextWhitIconInfo colorIcon='cyan-text' icon='loyalty' text={`Días de Garantía: ${props.item.attributes.warranty_days}`} /> : null
      }
      {
        props.item.relationships.model.data.attributes.name ?
          <TextWhitIconInfo colorIcon='cyan-text' icon='check' text={`Modelo: ${props.item.relationships.model.data.attributes.name}`} /> : null
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

export default VehicleAttributes;