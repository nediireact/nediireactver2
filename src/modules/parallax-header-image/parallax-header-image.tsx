import React from 'react';
import 'src/modules/parallax-header-image/parallax-header-image.scss';
import Title from 'src/modules/title/title';

const ParallaxHeaderImage = (props: any): React.ReactElement => {
  return (
    <div>
      <div
        className='ParallaxHeaderImage'
        style={{backgroundImage: `url(${props.image})`}}>
        <div className='ParallaxHeaderImage__info'>
          <div className='container'>
            <Title
              text='Expo colorado'
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
    </div>
  );
};

export default ParallaxHeaderImage;
