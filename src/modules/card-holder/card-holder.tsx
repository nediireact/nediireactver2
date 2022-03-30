import React, {useState} from 'react';
import 'src/modules/card-holder/card-holder.scss';
import { useSelector } from 'react-redux';
import BasicTextWithIcon from 'src/modules/text-with-icon/basic-text-with-icon';
import StrongText from '../strong-text/strong-text';
import GenericItemAddToFavoritesButton from 'src/modules/favorite-button/favorite-button';
import BasicIcon from 'src/modules/basic-icon/basic-icon';
import { Link } from 'react-router-dom';

const imageCardHolder = '/assets/card-holder.jpg';

const CardHolder = (props: any): React.ReactElement => {
  const system = useSelector((state: any) => state.system);
  const prefix = system.platform.prefix;
  const cardHolder = `${prefix}${imageCardHolder}`;
  const stand = props.stand;
  if ( !stand ) return <></>;
  const [isLoading, setIsLoading] = useState(false);
  const standURL = `/empresa/${props.standSlug ? props.standSlug : stand.attributes.slug}`;
  const zip_code = stand.attributes.zip_code ? stand.attributes.zip_code : null;
  const address = stand.attributes.address ? stand.attributes.address : null;
  let fullAddress: string = address;
  if (stand.relationships &&
    stand.relationships.city &&
    stand.relationships.city.data &&
    stand.relationships.city.data.attributes &&
    stand.relationships.city.data.attributes.name) {
      fullAddress += `, ${stand.relationships.city.data.attributes.name}`;
  }
  if (stand.relationships &&
    stand.relationships.city &&
    stand.relationships.city.data &&
    stand.relationships.city.data.relationships &&
    stand.relationships.city.data.relationships.state &&
    stand.relationships.city.data.relationships.state.data &&
    stand.relationships.city.data.relationships.state.data.attributes &&
    stand.relationships.city.data.relationships.state.data.attributes.name) {
    fullAddress += `, ${stand.relationships.city.data.relationships.state.data.attributes.name}`;
  }
  if (zip_code) {
    fullAddress += `, ${zip_code}`;
  }

  return (
    <div className='CardHolder col s12 m6'>
      <div className='GenericCard'>
        <div className='CardHolder__wrapper' style={{backgroundImage: `url(${cardHolder})`}}>
          <div className='CardHolder__icons'>
            <GenericItemAddToFavoritesButton
              item={stand}
              isLoading={isLoading}
              setIsLoading={setIsLoading} />
            <BasicIcon
              icon='home'
              color='white-text'
              link={standURL} />
            <BasicIcon
              icon='place'
              color='white-text'
              link={`https://www.google.com/maps?q=${fullAddress}`} />
          </div>
          <div className='blue CardHolder__flex-filler'></div>
          <div className='CardHolder__container-logo'>
            <Link
              to={standURL}
              className='CardHolder__img-logo'
              style={{backgroundImage: `url(${props.stand.attributes.img_logo})`}}></Link>
          </div>
        </div>
        <div className='CardHolder__info'>
          <StrongText text={props.stand.attributes.name} align='right' fullWidth={true} shadow={true} />
          {
            props.stand.attributes.contact_email ?
              <BasicTextWithIcon
                icon='email'
                color_icon='red-text'
                text={props.stand.attributes.contact_email}
                link={`mailto:${props.stand.attributes.contact_email}`} /> : null
          }
          {
            props.stand.relationships.owner.data.attributes.profile.owner_phone ?
              <BasicTextWithIcon
                icon='local_phone'
                color_icon='green-text'
                text={props.stand.relationships.owner.data.attributes.profile.owner_phone}
                link={`tel:521+${props.stand.relationships.owner.data.attributes.profile.owner_phone}`} /> : null
          }
          {
            props.stand.attributes.web_link ?
              <BasicTextWithIcon
                icon='language'
                color_icon='yellow-text'
                text={props.stand.attributes.web_link}
                link={props.stand.attributes.web_link} /> : null
          }
        </div>
      </div>
    </div>
  );
};

export default CardHolder;
