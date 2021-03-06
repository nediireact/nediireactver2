import React, {
  useState
} from 'react';
import { Link } from 'react-router-dom';
import {
  Title,
  FavoriteButton
} from 'rrmc';
import './stand-header.scss';
import StandRatings from 'src/modules/stand-header/stand-ratings';

const StandHeader = (props: any): React.ReactElement => {
  const stand: any = props.stand;
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      className={`StandHeader StandHeader${props.size ? `--${props.size}` : ''}`}
      style={{backgroundImage: `url(${stand.attributes.img_cover})`}}>
      <div className='StandHeader__info'>
        <div className='container StandHeader__content-wrapper'>
          {
            stand.attributes.restaurant ?
            <div className='StandHeader__restaurant-indicator'>
              <i className='material-icons center white-text right red'>restaurant</i>
            </div> : null
          }
          <div className='StandHeader__dummy-space'></div>
          <div className='StandHeader__stand-identity-wrapper'>
            <Link
              to={`/empresa/${stand.attributes.slug}`}
              className='StandHeader__logo white'
              style={{backgroundImage: `url(${stand.attributes.img_logo})`}}>
            </Link>
            <div className='StandHeader__title-wrapper'>
            <FavoriteButton
              item={stand}
              isLoading={isLoading}
              setIsLoading={setIsLoading} />
            <Title
              link={`/empresa/${stand.attributes.slug}`}
              Link={Link}
              color='white'
              text={stand.attributes.name}
              align='left'
              fullWidth={true}
              shadow={true} />
            <StandRatings
              standId={stand.id}
              standSlug={stand.attributes.slug}
              averageRating={stand.attributes.average_rating} />
            {
              stand.slogan ?
                <div className='StandHeader__slogan truncate'>{stand.slogan}</div> : null
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandHeader;
