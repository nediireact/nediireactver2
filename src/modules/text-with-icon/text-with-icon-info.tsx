import React from 'react';
import 'src/modules/text-with-icon/text-with-icon.scss';

const TextWithIconInfo = (props: any): React.ReactElement => {
  return (
  <div className={`TextWithIconinfo  ${props.className}`}>
    <i className={`material-icons left ${props.color_icon}`}>{props.icon}</i>{props.text}
    <span className='grey-text text-darken-4 truncate'></span>
  </div>
  );
};

export default TextWithIconInfo;
