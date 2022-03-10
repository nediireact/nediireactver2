import React, { useState } from 'react';
import 'src/modules/basic-icon/basic-icon';

const BasicIcon = (props: any): React.ReactElement => {
  const [click, setClick] = useState('offclick');
  return (
    <a
      className={`BasicICon ${click === 'onclick' ? 'IsLoadingOpacity' : '' }`}
      href={props.link}
      target={`${props.parent ? '_parent' : '_blank'}`}
      onClick={() =>{
        setClick('onclick');
      }}>
      <i className={`material-icons ${props.color_icon}`}>{props.icon}</i>
    </a>
  );
};

export default BasicIcon;
