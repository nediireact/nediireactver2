import React from 'react';
import 'src/modules/stand-contact-info/stand-contact-info.scss';
import TextWithIcon from 'src/modules/text-with-icon/text-with-icon';
import StrongText from 'src/modules/strong-text/strong-text';

const StandContactInfo = (props: any): React.ReactElement => {
  const phones = props.phones;
  const address = props.address;
  const zip_code = props.zip_code;
  const city = props.city && props.city.attributes ? props.city : null;
  let fullAddress: string = address;
  if ( city ) {
    fullAddress += `, ${city.attributes.name}`;
    console.log('>>>>>> state', city.relationships.state);
    if ( city.relationships && city.relationships.state &&
        city.relationships.state.data && city.relationships.state.data.attributes ) {
      const state = city.relationships.state.data;
      fullAddress += `, ${state.attributes.name}`;
      if ( state.relationships && state.relationships.country &&
        state.relationships.country.data && state.relationships.country.data.attributes ) {
        const country = state.relationships.country.data;
        fullAddress += `, ${country.attributes.name}`;
      }
    }
  }
  fullAddress += `, ${zip_code}`;

  return (
    <div className='StandContactInfo GenericCard'>
      <StrongText text='Datos de contacto' fullWidth={true} />
      <TextWithIcon
        link={`https://www.google.com/maps?q=${fullAddress}`}
        icon='location_on' color_icon='red-text'
        text={fullAddress} />
      {
        phones.length ?
          <div className='row'>
          {
            phones.map((i: any, index: number) => {
              return (
                <div className='col s12 xl6' key={index}>
                  <TextWithIcon
                    link={`tel:+521${i.attributes.phone}`}
                    color_icon='green-text' icon='call'
                    text={i.attributes.phone} />
                </div>
              );
            })
          } </div> : null
      }
    </div>
  );
};

export default StandContactInfo;
