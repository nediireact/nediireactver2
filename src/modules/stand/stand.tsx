import React from 'react';
import {
  HorizontalSpace,
  CommonLargeText,
  QRCodeComponent
} from 'rrmc';
import { Link } from 'react-router-dom';
import StandDetailGallery from 'src/modules/stand-detail-gallery/stand-detail-gallery';
import StandContactInfo from 'src/modules/stand-contact-info/stand-contact-info';
import StandOwnerInfo from 'src/modules/stand-owner-info/stand-owner-info';
import ExpoItem from 'src/modules/expo-grid/expo-item';
import GroupItem from 'src/modules/group-grid/group-item';
import StandOptionMenuGrid from 'src/modules/stand-options-menu-grid/stand-options-menu-grid';

const StandComponent = (props: any): React.ReactElement => {
  const stand = props.stand;

  return (
    <div className='Stand container row'>
      <HorizontalSpace size='small' />
      <div className='col s12 m8'>
        <StandOptionMenuGrid standSlug={stand.attributes.slug} />
        <CommonLargeText text={stand.attributes.description} Link={Link} />
        <HorizontalSpace size='x-small' />
        <StandDetailGallery images={stand.relationships.pictures.data} />
        <HorizontalSpace size='small' />
        <div className='hide-on-small-only'>
          <QRCodeComponent title={`QR code de ${stand.attributes.name}`} />
          <HorizontalSpace size='small' />
        </div>
      </div>
      <div className='col s12 m4'>
        {
          stand.relationships.phones.data.length || stand.attributes.address ?
            <>
              <StandContactInfo
                title='Contacto'
                address={stand.attributes.address}
                city={stand.relationships.city.data}
                zip_code={stand.attributes.zip_code}
                phones={stand.relationships.phones.data} />
              <HorizontalSpace size='small' />
            </> : null
        }
        {
          stand.relationships.owner.data.attributes &&
          stand.relationships.owner.data.attributes.profile ?
            <>
              <StandOwnerInfo owner={stand.relationships.owner.data.attributes} />
              <HorizontalSpace size='small' />
            </> : null
        }
        <ExpoItem item={stand.relationships.expo.data} />
        <GroupItem
          item={stand.relationships.group.data}
          expoId={stand.relationships.expo.data.attributes.slug} />
        <div className='hide-on-med-and-up'>
          <HorizontalSpace size='x-small' />
          <QRCodeComponent title={`QR code de ${stand.attributes.name}`} />
          <HorizontalSpace size='x-small' />
        </div>
      </div>
    </div>
  );
};

export default StandComponent;
