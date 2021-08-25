import React from 'react';
import 'src/modules/stand-detail/stand-detail.scss';
import CommonLargeText from 'src/modules/stand-detail/stand-common-large-text';
import StandPhones from 'src/modules/stand-detail/stand-phones';
import StandPictures from 'src/modules/stand-detail/stand-pictures';
import StandOwnerInfo from 'src/modules/stand-detail/stand-owner-info';
import ExpoItem from 'src/modules/expo-grid/expo-item';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import GroupItem from 'src/modules/group-grid/group-item';

const StandContent = (props: any): React.ReactElement => {
  return (
    <div className='Stand'>
      <div className='container row'>
        <div className='col s12 m8 Stand__main-container'>
          <CommonLargeText text={props.stand.attributes.description} />
        </div>
        <div className='col s12 m4 Stand__aside'>
          <StandPhones
            title='Contacto'
            phones={props.stand.relationships.phones} />
          <HorizontalSpace size='small' />
          <StandOwnerInfo owner={props.stand.relationships.owner.data.attributes} />
          <HorizontalSpace size='medium' />
          <ExpoItem item={props.stand.relationships.expo.data}/>
          <HorizontalSpace size='small' />
          <GroupItem item={props.stand.relationships.group.data}/>
        </div>
      </div>
      <StandPictures
        backgroundImage={props.stand.attributes.img_cover}
        images={props.stand.relationships.pictures.data} />
    </div>
  );
};

export default StandContent;

