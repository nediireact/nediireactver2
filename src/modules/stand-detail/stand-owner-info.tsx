import React from 'react';
import 'src/modules/stand-detail/stand-detail.scss';

const StandOwnerInfo = (props: any): React.ReactElement => {
  return (
    <div className='StandOwnerInfo grey lighten-3'>
      <div
        className='StandOwnerInfo__owner-img'
        style={{backgroundImage: `url(${props.owner.profile.img_picture})`}}>
      </div>
      <div className='StandOwnerInfo__owner-Name'>{props.owner.first_name} {props.owner.last_name}</div>
      <div className='StandOwnerInfo__owner-Position'>{props.owner.profile.owner_position}</div>
      <div dangerouslySetInnerHTML={{__html: props.owner.profile.owner_position_description}}>
      </div>
      <div className='row StandOwnerInfo__owner-numbers'>
        <div className='col s12 xl6'>
          <a
            href={`tel:${props.owner.profile.owner_office_phone}}`}
            className='StandOwnerInfo__owner-phones white'>
            <i className='material-icons'>call</i>
            <span className='grey-text text-darken-4'>{props.owner.profile.owner_office_phone}</span>
          </a>
        </div>
        <div className='col s12 xl6'>
          <a
            href={`https://wa.me/${props.owner.profile.owner_whatsapp}}`}
            className='StandOwnerInfo__owner-phones white'>
            <i className='material-icons green-text'>whatsapp</i>
            <span className='grey-text text-darken-4'>{props.owner.profile.owner_whatsapp}</span>
          </a>
        </div>
      </div>
      <a
        className='StandOwnerInfo__owner-contact truncate white'
        href={`mailto:${props.owner.profile.owner_emai}`}
        target='_blank'
        rel='noreferrer'>
        <i className='material-icons'>mail_outline</i>
        <span className='grey-text text-darken-4'>{props.owner.profile.owner_email}</span>
      </a>
      <a
        className='StandOwnerInfo__owner-contact white'
        href={`https://www.google.com/maps?q=${props.ownerAddress}`}
        target='_blank'
        rel='noreferrer'>
        <i className='material-icons'>location_on</i>
        <span className='grey-text text-darken-4'>{props.owner.profile.owner_address}</span>
      </a>
    </div>
  );
};

export default StandOwnerInfo;
