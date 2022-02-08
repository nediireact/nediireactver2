import React from 'react';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import TextWhitIconInfo from 'src/modules/text-with-icon/text-with-icon-info';
import TextWithIcon from 'src/modules/text-with-icon/text-with-icon';
import StrongText from 'src/modules/strong-text/strong-text';

const ProductAttributes = (props: any): React.ReactElement => {
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
        props.item.attributes.brand ?
          <TextWhitIconInfo
            colorIcon='cyan-text'
            icon='check'
            text={`Marca: ${props.item.attributes.brand}`} /> : null
      }
      {
        props.item.attributes.warranty_days && props.item.attributes.warranty_days > 0 ?
          <TextWhitIconInfo
            colorIcon='cyan-text'
            icon='check'
            text={`Días de garantía: ${props.item.attributes.warranty_days}`} /> : null
      }
      <HorizontalSpace size='x-small' />
      {
        props.item.attributes.support_email || props.item.attributes.support_phone ?
          <StrongText text='Consultas o aclaraciones' /> : null
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

export default ProductAttributes;
