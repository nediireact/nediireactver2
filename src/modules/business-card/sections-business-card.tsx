import React, { useState } from 'react';
import SubTitle from 'src/modules/sub-title/sub-title';
import TextWithIcon from 'src/modules/text-with-icon/text-with-icon';

const SectionsBusinessCard = (props: any): React.ReactElement => {
  const [aboutSelected, setAboutSelected] = useState('us');
  const stand = props.stand;

  return (
    <>
     <div className="container">
       <div className='row'>
        <div className={`col s12 m4 ${aboutSelected === 'us' ? 'red-text' : ''}`}
          onClick={() => {
            setAboutSelected('us');
          }}>Nosotros</div>
        <div className={`col s12 m4 ${aboutSelected === 'company' ? 'red-text' : ''}`}
          onClick={() => {
            setAboutSelected('company');
          }}>La Empresa</div>
        <div className={`col s12 m4 ${aboutSelected === 'products' ? 'red-text' : ''}`}
          onClick={() => {
            setAboutSelected('products');
          }}>Producto Estrella</div>
       </div>
       <div className='row'>
        <SubTitle text='Comunícate con Nosotros' />
          <div className='col s12 m3'>
            {
              stand.relationships.phones.data.map((i: any, index: number) => {
                return (
                  <TextWithIcon
                    key={index}
                    text={i.attributes.phone}
                    color_icon='cyan-text'
                    icon='call'
                    link={`tel:${i.attributes.phone}`} />
                );
              })
            }
          </div>
          <div className='col s12 m3'>
            {
              stand.relationships.owner.data.map((i: any, index: number) => {
                return (
                  <TextWithIcon
                    key={index}
                    text={i.attributes.profile.owner_whatsapp}
                    color_icon='cyan-text'
                    icon='call'
                    link={`tel:${i.attributes.profile.owner_whatsapp}`} />
                );
              })
            }
          </div>
          <div className="col s12 m3">
            <TextWithIcon
              text={stand.attributes.contact_email}
              color_icon='red-text'
              icon='email'
              link={`mailto:${stand.attributes.contact_email}`}/>
          </div>
          <div className="col s12 m3">
            <TextWithIcon
              text='Linkedin'
              link={stand.attributes.linkedin_link}/>
          </div>
       </div>
       <div className='row'>
         <div className={`${aboutSelected === 'us' ? '' : 'hide'}`}>{props.stand.attributes.name}
         </div>
         <div className={`${aboutSelected === 'company' ? '' : 'hide'}`}>{props.stand.attributes.vision}</div>
         <div className={`${aboutSelected === 'products' ? '' : 'hide'}`}>{props.stand.attributes.short_description}</div>
       </div>
     </div>
    </>
  );
};

export default SectionsBusinessCard;
