import React from 'react';
import { Link } from 'react-router-dom';
import StrongText from 'src/modules/strong-text/strong-text';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';

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
          <HorizontalSpace size='medium'/>
          <StrongText text={props.item.attributes.name}/>
          { props.item.attributes.slogan ?
            <span className='StandItem__slogan truncate grey-text text-darken-2'>
            {props.item.attributes.slogan}
            </span> : null
          }
        </div>
      </div>
    </Link>
  );
};

export default StandItem;
