import React from 'react';
import { Link } from 'react-router-dom';

const GroupItem = (props: any): React.ReactElement => {
  const color = props.GroupI.attributes.color;
  return (
    <Link to={`/groups/${props.GroupI.attributes.slug}`}>
      <div className='GroupItem col s12 m6 l4'>
        <div className='GroupItem__card'>
          <div
            className='GroupItem__img'
            style={{backgroundImage: `url(${props.GroupI.attributes.img_picture})`}}>
          </div>
          <div className='GroupItem__icon center white'>
            <i
              className='center material-icons'
              style={{color: `${color}`}}>{props.GroupI.attributes.icon}</i>
          </div>
          <div className='GroupItem__title grey-text text-darken-4'>{props.GroupI.attributes.title}</div>
        </div>
      </div>
    </Link>
  );
};

export default GroupItem;
