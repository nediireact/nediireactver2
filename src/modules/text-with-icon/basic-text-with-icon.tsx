import React from 'react';
import 'src/modules/text-with-icon/text-with-icon.scss';

const BasicTextWithIcon = (props: any): React.ReactElement => {
  return (
    <div className='BasicTextWithIcon'>
      <a href={`${props.link}`}
        target={props.target ? props.target : '_parent'}
        rel='noreferrer'
        className='grey-text text-darken-3 truncate'>
        <i className={`material-icons left ${props.colorICon}`}>{props.icon}</i>{props.text}
      </a>
    </div>
  );
};

export default BasicTextWithIcon;
