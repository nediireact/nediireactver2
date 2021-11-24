import React from 'react';
import 'src/modules/stand-detail/stand-parallax-header-image.scss';
import Title from 'src/modules/title/title';
import StandRatings from 'src/modules/stand-detail/stand-ratings';

const StandParallaxHeaderImage = (props: any): React.ReactElement => {
  return (
    <div className='StandParallaxHeaderImage'>
      <div
        className={`StandParallaxHeaderImage${props.size ? `--${props.size}` : ''}`}
        style={{backgroundImage: `url(${props.image})`}}>
        <div
          className='StandParallaxHeaderImage__info'
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, ${props.gradientOpacity ? props.gradientOpacity : '0.65'}), rgba(0, 0, 0, 0))`
          }}>
          <div className='container StandParallaxHeaderImage__content-wrapper'>
            {
              props.restaurant ?
              <div className='StandParallaxHeaderImage__restaurant-indicator'>
                <i className='material-icons center white-text right red'>local_dining</i>
              </div> : null
            }
            <div className='StandParallaxHeaderImage__dummy-space'></div>
            <div className='StandParallaxHeaderImage__stand-identity-wrapper'>
              <div
                className='StandParallaxHeaderImage__logo white'
                style={{backgroundImage: `url(${props.logo})`}}>
              </div>
              <div className='StandParallaxHeaderImage__title-wrapper'>
              <Title
                text={props.title}
                align='left'
                fullWidth={true}
                shadow={true} />
              <StandRatings ratings={props.ratings} />
              {
                props.slogan ?
                  <div className='StandParallaxHeaderImage__slogan truncate'>{props.slogan}</div> : null
              }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandParallaxHeaderImage;
