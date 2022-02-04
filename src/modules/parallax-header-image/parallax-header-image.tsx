import React from 'react';
import 'src/modules/parallax-header-image/parallax-header-image.scss';
import Title from 'src/modules/title/title';
import Indicator from 'src/modules/indicator/indicator';

const ParallaxHeaderImage = (props: any): React.ReactElement => {
  return (
    <div
      className={`ParallaxHeaderImage${props.size ? `--${props.size}` : ''}`}
      style={{
        backgroundImage: `url(${props.image})`,
        backgroundAttachment: props.fixed ? 'fixed' : 'initial'
      }}>
      <div
        className='ParallaxHeaderImage__info'
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, ${props.gradientOpacity ? props.gradientOpacity : '0.65'}), rgba(0, 0, 0, 0))`
        }}>
        <div className='container'>
          {
            props.restaurant ?
            <div className='Restaurant red'>
              <div className='Restaurant__icon'>
                <i className='material-icons center white-text'>{props.restaurantIcon}</i>
              </div>
            </div> : null
          }
          {
            props.indicator ? <Indicator/> : null
          }
          <div>
            {
              props.logo ?
              <div className='LogoStand white'>
                <div
                  className='LogoStand__img'
                  style={{backgroundImage: `url(${props.logo})`}}>
                </div>
              </div> : null
            }
          </div>
          <Title
            text={props.title}
            align='left'
            fullWidth={true}
            shadow={true} />
          { props.email ?
            <a
              className='ParallaxHeaderImage__email white-text'
              href={`mailto:${props.email}`}
              rel='noreferrer'
              target='_blank'
              >Contacto: {props.email}</a> : null
          }
        </div>
      </div>
    </div>
  );
};

export default ParallaxHeaderImage;
