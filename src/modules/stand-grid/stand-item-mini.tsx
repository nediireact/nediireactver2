import React from 'react';
import { Link } from 'react-router-dom';
import Ratings from 'src/modules/ratings/ratings';
import 'src/modules/stand-grid/stand-item-mini.scss';

const StandItemMini = (props: any): React.ReactElement => {
  return (
    <div className={`StandItemMini ${props.cols}`}>
      <Link
        to={`/empresa/${props.item.attributes.slug}`}
        className='StandItemMini z-depth-1'>
        <div
          className={`StandItemMini__image ${ props.onlyRestaurants ?
            'StandItemMini__image--restaurants' : ''
          }`}
          style={{
            backgroundImage: `url(${props.item.attributes.img_logo}`
          }}>
        </div>
        {
          !props.onlyRestaurants && props.item.attributes.restaurant ?
            <i className='material-icons white-text red StandItemMini__restaurant'>restaurant</i> : null
        }
        <Ratings
          score={2}
          size='medium'
          centered={true} />
        <span className='StandItemMini__name truncate'>
          {props.item.attributes.name}
        </span>
      </Link>
    </div>
  );
};

export default StandItemMini;
