import React from 'react';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import { Link } from 'react-router-dom';
import StrongText from 'src/modules/strong-text/strong-text';

const GroupItem = (props: any): React.ReactElement => {
  const color = props.item.attributes.color;
  const icon = props.item.attributes.icon;
  return (
    <Link to={`/expos/${props.expoId}/${props.item.attributes.slug}`}>
      <div className={`GroupItem ${props.col}`}>
        <div className='GroupItem__card'>
          <div
            className='GroupItem__img'
            style={{backgroundImage: `url(${props.item.attributes.img_picture})`}}>
            {
              icon ? <>
                <div className='GroupItem__icon center white'>
                  <i className='center material-icons'
                    style={{color: `${color}`}}>{props.item.attributes.icon}</i>
                </div>
              </> : null
            }
          </div>
          {
            icon ? <HorizontalSpace size='medium' /> : <HorizontalSpace size='x-small' />
          }
          <StrongText text={props.item.attributes.name}/>
        </div>
      </div>
    </Link>
  );
};

export default GroupItem;
