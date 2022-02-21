import React from 'react';
import 'src/modules/text-with-icon/text-with-icon.scss';

const TextWithIconInfo = (props: any): React.ReactElement => {

  return (
  <div className={`TextWithIconinfo ${props.className}`}>
    <i className={`material-icons ${props.colorIcon}`}>{props.icon}</i>
    <span className='grey-text text-darken-4'>{props.text}</span>
  </div>
  );
};

export default TextWithIconInfo;
