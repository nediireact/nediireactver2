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
      <a
        className='StandOwnerInfo__owner-contact white'
        href={`tel:${props.owner.profile.owner_office_phone}}`}>
        <i className='material-icons'>call</i>
        <span>{props.owner.profile.owner_office_phone}</span>
      </a>
      <a href={`https://wa.me/${props.owner.profile.owner_whatsapp}}`}
        className='StandOwnerInfo__owner-contact white'>
        <i className='material-icons green-text'>whatsapp</i>
        <span>{props.owner.profile.owner_whatsapp}</span>
      </a>
      <a
        className='StandOwnerInfo__owner-contact truncate white'
        href={`mailto:${props.owner.profile.owner_emai}`}
        target='_blank'
        rel='noreferrer'>
        <i className='material-icons'>mail_outline</i>
        <span>{props.owner.profile.owner_email}</span>
      </a>
      <a
        className='StandOwnerInfo__owner-contact white'
        href={`https://www.google.com/maps?q=${props.ownerAddress}`}
        target='_blank'
        rel='noreferrer'>
        <i className='material-icons'>location_on</i>
        <span>{props.owner.profile.owner_address}</span>
      </a>
    </div>
  );
};

export default StandOwnerInfo;
