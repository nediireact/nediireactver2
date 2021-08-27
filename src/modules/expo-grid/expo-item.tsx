import React from 'react';
import { Link } from 'react-router-dom';

const ExpoItem = (props: any): React.ReactElement => {
  const isReal = props.item.attributes.real;
  return (
    <Link
      to={`/expos/${props.item.attributes.slug}`}>
      <div className={`ExpoItem ${props.col}`}>
        <div className='ExpoItem__card'>
          <div
            className='ExpoItem__img'
            style={{backgroundImage: `url(${props.item.attributes.img_picture})`}}>
          </div>
          <div className={`ExpoItem__square white-text red ${isReal ? 'hide' : ''}`}>
            Expo Virtual
            <i className='material-icons left'>laptop_windows</i>
          </div>
          <div className='grey-text text-darken-4 truncate ExpoItem__title'>
            {props.item.attributes.title}
          </div>
          <div className='ExpoItem__text'>Ir a la expo</div>
        </div>
      </div>
    </Link>
  );
};

export default ExpoItem;
