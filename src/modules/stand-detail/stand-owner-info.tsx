import React from 'react';
import 'src/modules/stand-detail/stand-detail.scss';
import TextWithIcon from 'src/modules/text-with-icon/text-with-icon';

const StandOwnerInfo = (props: any): React.ReactElement => {
  return (
    <div className='StandOwnerInfo grey lighten-3'>
      <div
        className='StandOwnerInfo__owner-img'
        style={{backgroundImage: `url(${props.owner.profile.img_picture})`}}>
      </div>
      <div className='StandOwnerInfo__owner-name'>{props.owner.first_name} {props.owner.last_name}</div>
      <div className='StandOwnerInfo__owner-position'>{props.owner.profile.owner_position}</div>
      <div dangerouslySetInnerHTML={{__html: props.owner.profile.owner_position_description}}></div>
      <div className='row'>
      <TextWithIcon
        color_item='white'
        use='tel:'
        link={props.owner.profile.owner_office_phone}
        size='col s12 xl6'
        color_icon='grey-text text-darken-4'
        icon='call'
        text_color='grey-text text-darken-4'
        text={props.owner.profile.owner_office_phone}/>
      <TextWithIcon
        color_item='white'
        use='https://wa.me/'
        link={props.owner.profile.owner_whatsapp}
        size='col s12 xl6'
        color_icon='green-text'
        icon='whatsapp'
        text_color='grey-text text-darken-4'
        text={props.owner.profile.owner_whatsapp}/>
      <TextWithIcon
        color_item='white'
        use='mailto:'
        link={props.owner.profile.owner_email}
        size='col s12'
        color_icon='red-text'
        icon='mail_outline'
        text_color='grey-text text-darken-4'
        text={props.owner.profile.owner_email}
        truncate='truncate'/>
      <TextWithIcon
        color_item='white'
        use='https://www.google.com/maps?q='
        link={props.owner.profile.owner_address}
        size='col s12'
        icon='location_on'
        text_color='grey-text text-darken-4'
        text={props.owner.profile.owner_address}/>
      </div>
    </div>
  );
};

export default StandOwnerInfo;
