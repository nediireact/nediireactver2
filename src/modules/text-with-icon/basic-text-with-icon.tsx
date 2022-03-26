import React from 'react';
import 'src/modules/text-with-icon/text-with-icon.scss';

const BasicTextWithIcon = (props: any): React.ReactElement => {
  return (
    <div className='BasicTextWithIcon'>
      <a href={`${props.link}`}
        target={props.parent ? '_parent' : '_blank'}
        rel='noreferrer'
        className='grey-text text-darken-3'>
        <i className={`material-icons left ${props.color_icon}`}>{props.icon}</i>
        <span className='truncate'>{props.text}</span>
      </a>
    </div>
  );
};

export default BasicTextWithIcon;
