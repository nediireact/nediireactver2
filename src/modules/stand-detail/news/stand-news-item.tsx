import React from 'react';
import { Link } from 'react-router-dom';

const StandNewsItem = (props: any): React.ReactElement => {
  return (
    <Link
      to=''
      className={`StandNewsItem ${props.size}`}>
      <div
        className={`StandNewsItem__card ${props.colorcard}`}
        style={{
          borderRadius: props.borderRadius,
          border: `solid ${props.bordersize}`}} >
        <div
          className='StandNewsItem__image'
          style={{backgroundImage: `url(${props.image})`,
          borderRadius: `${props.imageRadius}` }}>
        </div>
        <div
          className={`StandNewsItem__title 
            ${props.truncate}
            ${props.align}
            ${props.title_color}`}>{props.title}
        </div>
      </div>
    </Link>
  );
};

export default StandNewsItem;
