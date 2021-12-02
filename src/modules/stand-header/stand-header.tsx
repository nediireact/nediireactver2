import React from 'react';
import Title from 'src/modules/title/title';
import StandRatings from 'src/modules/stand-detail/stand-ratings';
import 'src/modules/stand-header/stand-header.scss';
import { Link } from 'react-router-dom';

const StandHeader = (props: any): React.ReactElement => {
  const stand: any = props.stand || {};

  return (
    <div className='StandHeader'>
      <div
        className={`StandHeader${props.size ? `--${props.size}` : ''}`}
        style={{backgroundImage: `url(${stand.img_cover})`}}>
        <div
          className='StandHeader__info'
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, ${props.gradientOpacity ? props.gradientOpacity : '0.65'}), rgba(0, 0, 0, 0))`
          }}>
          <div className='container StandHeader__content-wrapper'>
            {
              stand.restaurant ?
              <div className='StandHeader__restaurant-indicator'>
                <i className='material-icons center white-text right red'>local_dining</i>
              </div> : null
            }
            <div className='StandHeader__dummy-space'></div>
            <div className='StandHeader__stand-identity-wrapper'>
              <Link
                to={`/empresa/${stand.slug}`}
                className='StandHeader__logo white'
                style={{backgroundImage: `url(${stand.img_logo})`}}>
              </Link>
              <div className='StandHeader__title-wrapper'>
              <Title
                link={`/empresa/${stand.slug}`}
                color='white'
                text={stand.name}
                align='left'
                fullWidth={true}
                shadow={true} />
              <StandRatings ratings={props.ratings} />
              {
                stand.slogan ?
                  <div className='StandHeader__slogan truncate'>{stand.slogan}</div> : null
              }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandHeader;