import React from 'react';
import { Link } from 'react-router-dom';
import 'src/modules/my-stands/stand-item.scss';

const MyStandItem = (props: any): React.ReactElement => {
  const stand: any = props.item;
  if ( !stand || !stand.id || !stand.attributes ) return <></>;
  const url = props.url ? props.url : `/empresa/${stand.attributes.slug}`;

  return (
    <div className='col s6 m3 MyStandItem'>
      <div className='MyStandItem z-depth-1'>
        <Link to={url}
          className={`MyStandItem__image ${ props.onlyRestaurants ?
            'MyStandItem__image--restaurants' : ''
          }`}
          style={{
            backgroundImage: `url(${props.item.attributes.img_logo}`
          }}>
        </Link>
        <Link to={url} className='MyStandItem__name truncate'>
          {props.item.attributes.name}
        </Link>
      </div>
    </div>
  );
};

export default MyStandItem;
