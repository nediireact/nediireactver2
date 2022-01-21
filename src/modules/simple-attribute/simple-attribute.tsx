import React from 'react';
import 'src/modules/simple-attribute/simple-attribute.scss';

const SimpleAttribute = (props: any): React.ReactElement => {
  return (
    <div className={`SimpleAttribute SimpleAttribute--${props.size} SimpleAttribute--${props.margin} ${props.align ? props.align : 'center-align'}`}>
      <span className='grey-text'>{props.text}</span>
      <span className='cyan-text'>{props.attribute}</span>
    </div>
  );
};

export default SimpleAttribute;
