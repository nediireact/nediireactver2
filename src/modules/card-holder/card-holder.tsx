import React from 'react';
import { useSelector } from 'react-redux';
import 'src/modules/card-holder/card-holder.scss';
import BasicTextWithIcon from 'src/modules/text-with-icon/basic-text-with-icon';

const imageCardHolder = '/assets/card-holder.jpg';

const CardHolder = (props: any): React.ReactElement => {
  const system = useSelector((state: any) => state.system);
  const prefix = system.platform.prefix;
  const cardHolder = `${prefix}${imageCardHolder}`;
  const standURL = `/empresa/${props.standSlug ? props.standSlug : props.stand.attributes.slug}`;
  const address = props.stand.attributes.address;
  const zipCode = props.stand.attributes.zip_code;
  let fullAddress: string = address;
  if (zipCode) fullAddress += `,${zipCode}`;

  return (
    <div className='CardHolder col s12 m6 l6'>
      <div className='CardHolder__card z-depth-3'>
        <div
          className='CardHolder__header'
          style={{backgroundImage: `url(${cardHolder})`}}>
            <div className='CardHolder__headerSection'>
              <div className='CardHolder__icons'>
                <BasicTextWithIcon
                  icon='home'
                  colorICon='white-text'
                  alignIcon='center-align'
                  link={standURL}/>
                <BasicTextWithIcon
                  icon='location_on'
                  colorICon='white-text'
                  alignIcon='center-align'
                  target='_blank'
                  link={`https://www.google.com/maps?q=${fullAddress}`} />
              </div>
              <a className='CardHolder__logo'
                href={standURL}
                target='_parent'
                rel='noreferrer'>
                <div style={{backgroundImage: `url(${props.stand.attributes.img_logo})`}}
                  className='CardHolder__imageLogo'>
                </div>
              </a>
            </div>
        </div>
        <div className='CardHolder__linksSection'>
          {
            props.stand.attributes.contact_email ?
              <BasicTextWithIcon
                icon='home'
                colorICon='red-text'
                link={`mailto:${props.stand.attributes.contact_email}`}
                text={props.stand.attributes.contact_email}
                truncate={true} /> : null
          }
          {
            props.stand.relationships.owner.data.attributes.profile.owner_phone ?
              <BasicTextWithIcon
                icon='local_phone'
                colorICon='green-text'
                link={`tel:+521${props.stand.relationships.owner.data.attributes.profile.owner_phone}`}
                text={props.stand.relationships.owner.data.attributes.profile.owner_phone} /> : null
          }
          {
            props.stand.attributes.web_link ?
              <BasicTextWithIcon
                icon='language'
                colorICon='amber-text'
                target='_blank'
                link={props.stand.attributes.web_link}
                text={props.stand.attributes.web_link} /> : null
          }
        </div>
      </div>
    </div>
  );
};

export default CardHolder;
