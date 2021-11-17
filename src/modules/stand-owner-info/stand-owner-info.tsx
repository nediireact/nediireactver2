import React from 'react';
// import 'src/modules/stand-detail/stand-detail.scss';
import TextWithIcon from 'src/modules/text-with-icon/text-with-icon';

const StandOwnerInfo = (props: any): React.ReactElement => {
  const owner: any = props.owner;
  const profile: any = owner.profile || {};

  return (
    <div className='StandOwnerInfo grey lighten-3'>
      {
        profile.img_picture ?
        <div
          className='StandOwnerInfo__owner-img'
          style={{backgroundImage: `url(${profile.img_picture})`}}>
        </div> : null
      }
      {
        owner.first_name && owner.last_name ?
          <div className='StandOwnerInfo__owner-name'>{owner.first_name} {owner.last_name}</div> : null
      }
      {
        profile.owner_position ?
          <div className='StandOwnerInfo__owner-position'>{profile.owner_position}</div> : null
      }
      {
        profile.owner_position_description ?
          <div dangerouslySetInnerHTML={{__html: profile.owner_position_description}}></div> : null
      }
      <div className='row'>
      {
        profile.owner_office_phone ?
          <TextWithIcon
            color_item='white'
            use='tel:'
            link={profile.owner_office_phone}
            size='col s12 xl6'
            color_icon='grey-text text-darken-4'
            icon='call'
            text_color='grey-text text-darken-4'
            text={props.owner.profile.owner_office_phone}/> : null
      }
      {
        profile.owner_whatsapp ?
          <TextWithIcon
            color_item='white'
            use='https://wa.me/'
            link={profile.owner_whatsapp}
            size='col s12 xl6'
            color_icon='green-text'
            icon='whatsapp'
            text_color='grey-text text-darken-4'
            text={props.owner.profile.owner_whatsapp}/> : null
      }
      {
        profile.owner_email ?
          <TextWithIcon
            color_item='white'
            use='mailto:'
            link={profile.owner_email}
            size='col s12'
            color_icon='red-text'
            icon='mail_outline'
            text_color='grey-text text-darken-4'
            text={profile.owner_email}
            truncate='truncate'/> : null
      }
      {
        profile.owner_address ?
          <TextWithIcon
            color_item='white'
            use='https://www.google.com/maps?q='
            link={profile.owner_address}
            size='col s12'
            icon='location_on'
            text_color='grey-text text-darken-4'
            text={profile.owner_address}/> : null
      }
      </div>
    </div>
  );
};

export default StandOwnerInfo;
