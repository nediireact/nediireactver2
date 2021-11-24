import React from 'react';
import 'src/modules/text-with-icon/text-with-icon.scss';

const TextWithIcon = (props: any): React.ReactElement => {
  return (
   <a className={`TextWithIcon center-align ${props.className}`}
    href={props.link} target='_blank' rel='noreferrer'>
    <i className={`material-icons ${props.color_icon}`}>{props.icon}</i>
    <span className='grey-text text-darken-4'>{props.text}</span>
   </a>
  );
};

export default TextWithIcon;
