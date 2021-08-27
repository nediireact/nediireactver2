import React from 'react';
import { Link } from 'react-router-dom';

const GroupItem = (props: any): React.ReactElement => {
  const color = props.item.attributes.color;
  return (
    <Link to={`/expos/${props.expoId}/${props.item.attributes.slug}`}>
      <div className={`GroupItem ${props.col}`}>
        <div className='GroupItem__card'>
          <div
            className='GroupItem__img'
            style={{backgroundImage: `url(${props.item.attributes.img_picture})`}}>
            <div className='GroupItem__icon center white'>
              <i
                className='center material-icons'
                style={{color: `${color}`}}>{props.item.attributes.icon}</i>
            </div>
          </div>
          <div className='grey-text text-darken-4 truncate GroupItem__title'>
            {props.item.attributes.title}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GroupItem;
