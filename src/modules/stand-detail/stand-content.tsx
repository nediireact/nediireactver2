import React from 'react';
import 'src/modules/stand-detail/stand-detail.scss';
import CommonLargeText from 'src/modules/stand-detail/stand-common-large-text';
import StandPhones from 'src/modules/stand-detail/stand-phones';
import StandPictures from 'src/modules/stand-detail/stand-pictures';
import StandOwnerInfo from 'src/modules/stand-detail/stand-owner-info';

const StandContent = (props: any): React.ReactElement => {
  return (
    <div className='Stand'>
      <div className='container row'>
        <div className='col s12 m9 Stand__main-container'>
          <CommonLargeText text={props.stand.attributes.description} />
        </div>
        <div className='col s12 m3 Stand__aside'>
          <StandPhones
            title='Contacto'
            phones={props.stand.relationships.phones} />
        </div>
      </div>
      <div className='container row'>
      <div className='col s12 m9 green'>SECCIÓN PARA CUADRO EXPO Y GRUPOS</div>
       <div className='col s12 m3'>
        <StandOwnerInfo owner={props.stand.relationships.owner.data.attributes} />
       </div>
      </div>
      <StandPictures
        backgroundImage={props.stand.attributes.img_cover}
        images={props.stand.relationships.pictures.data} />
    </div>
  );
};

export default StandContent;

