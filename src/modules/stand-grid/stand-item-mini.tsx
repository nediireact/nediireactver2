import React, {
  useState
} from 'react';
import { Link } from 'react-router-dom';
import {
  FavoriteButton,
  Ratings
} from 'rrmc';
import './stand-item-mini.scss';

const StandItemMini = (props: any): React.ReactElement => {
  const stand: any = props.item;
  if ( !stand || !stand.id || !stand.attributes ) return <></>;
  const [isLoading, setIsLoading] = useState(false);
  const url = props.url ? props.url : `/empresa/${stand.attributes.slug}`;

  return (
    <div className={`${props.cols} StandItemMini`}>
      <div className='StandItemMini z-depth-1'>
        <Link to={url}
          className={`StandItemMini__image ${ props.onlyRestaurants ?
            'StandItemMini__image--restaurants' : ''
          }`}
          style={{
            backgroundImage: `url(${props.item.attributes.img_logo}`
          }}>
        </Link>
        {
          !props.onlyRestaurants && props.item.attributes.restaurant ?
            <i className='material-icons white-text red StandItemMini__restaurant'>restaurant</i> : null
        }
        <FavoriteButton
          item={stand}
          isLoading={isLoading}
          setIsLoading={setIsLoading} />
        <Ratings
          score={props.item.attributes.average_rating}
          size='medium'
          centered={true} />
        <Link to={url} className='StandItemMini__name truncate'>
          {props.item.attributes.name}
        </Link>
      </div>
    </div>
  );
};

export default StandItemMini;
