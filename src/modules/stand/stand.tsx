import React from 'react';
import CommonLargeText from 'src/modules/stand-detail/stand-common-large-text';

import StandPictures from 'src/modules/stand-detail/stand-pictures';
import QRCodeComponent from 'src/modules/stand-detail/stand-qr';

import StandContactInfo from 'src/modules/stand-contact-info/stand-contact-info';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import StandOwnerInfo from 'src/modules/stand-owner-info/stand-owner-info';
import ExpoItem from 'src/modules/expo-grid/expo-item';
import GroupItem from 'src/modules/group-grid/group-item';

const StandComponent = (props: any): React.ReactElement => {
  const stand = props.stand;

  return (
    <div className='Stand container row'>
      <HorizontalSpace size='small' />
      <div className='col s12 m8'>
        <CommonLargeText text={stand.attributes.description} />
        <StandPictures images={stand.relationships.pictures.data} />
        <QRCodeComponent title={`QR code de ${stand.attributes.name}`}/>
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
      </div>
    </div>
  );
};

export default StandComponent;
