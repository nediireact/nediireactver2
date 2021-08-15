import React from 'react';
import { Link } from 'react-router-dom';

const StandItem = (props: any): React.ReactElement => {
  const logo = props.item.attributes.img_logo;
  return (
    <Link to={`/stand/${props.item.attributes.slug}`}>
      <div className='StandItem col s12 m6 l4'>
        <div className='StandItem__card'>
          <div
            className='StandItem__cover'
            style={{backgroundImage: `url(${props.item.attributes.img_cover})`}}>
            <div
              className='StandItem__logo'
              style={{backgroundImage: `url(${logo})`}}></div>
          </div>
          <div className='grey-text text-darken-4 truncate StandItem__title truncate'>
            {props.item.attributes.name}
          </div>
          <span className='StandItem__slogan truncate grey-text text-darken-2'>
            {props.item.attributes.slogan}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default StandItem;
