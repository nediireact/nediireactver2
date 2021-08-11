import React from 'react';
import { Link } from 'react-router-dom';

const ExpoItem = (props: any): React.ReactElement => {
  const isReal = props.ExpoI.attributes.real;
  return (
    <Link
      to={`/expos/${props.ExpoI.attributes.slug}`}>
      <div className='ExpoItem col s12 m6 l4'>
        <div className='ExpoItem__card'>
          <div
            className='ExpoItem__img'
            style={{backgroundImage: `url(${props.ExpoI.attributes.img_picture})`}}>
          </div>
          <div className={`ExpoItem__square white-text red ${isReal ? 'hide' : ''}`}>
            Expo Virtual
            <i className='material-icons left'>laptop_windows</i>
          </div>
          <div className='grey-text text-darken-4 truncate ExpoItem__title'>
            {props.ExpoI.attributes.title}
          </div>
          <div className='ExpoItem__text'>Ir a la expo</div>
        </div>
      </div>
    </Link>
  );
};

export default ExpoItem;
