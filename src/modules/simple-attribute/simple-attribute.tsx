import React from 'react';
import 'src/modules/simple-attribute/simple-attribute.scss';

const SimpleAttribute = (props: any): React.ReactElement => {
  return (
    <div className={`SimpleAttribute SimpleAttribute--${props.size} SimpleAttribute--${props.margin} ${props.align ? props.align : 'center-align'}`}>
      <span className={props.color1}>{props.text}</span>
      <span className={props.color2}>{props.attribute}</span>
    </div>
  );
};

export default SimpleAttribute;
