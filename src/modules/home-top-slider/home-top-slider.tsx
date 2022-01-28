import React, {
  useState
} from 'react';
import {
  Swiper,
  SwiperSlide
} from 'swiper/react';
import { useSelector } from 'react-redux';
import 'src/modules/home-top-slider/home-top-slider.scss';
import Title from 'src/modules/title/title';

const sliderNextButtonFile = '/assets/slider-button-next.svg';
const sliderPrevButtonFile = '/assets/slider-button-prev.svg';

const SlideAddons = ( props: any ): React.ReactElement => {
  const system: any = useSelector((state: any) => state.system);
  const prefix = system.platform.prefix;
  const sliderNextButtonFileURL = `${prefix}${sliderNextButtonFile}`;
  const sliderPrevButtonFileURL = `${prefix}${sliderPrevButtonFile}`;
  const swiper = props.swiper;

  return (
    <>
      <div
        className='Swiper__navigation-button Swiper__navigation-button--left z-depth-2'
        style={{ backgroundImage: `url(${sliderPrevButtonFileURL})` }}
        onClick={() => {
          if ( swiper ) swiper.slidePrev();
        }}></div>
      <div
        className='Swiper__navigation-button Swiper__navigation-button--right z-depth-2'
        style={{ backgroundImage: `url(${sliderNextButtonFileURL})` }}
        onClick={() => {
          if ( swiper ) swiper.slideNext();
        }}></div>
      <div className='swiper-pagination'></div>
    </>
  );
};

interface SlideTextInterface {
  name: string;
  description?: string;
  link?: string;
  align: string;
}

const SlideText = (props: SlideTextInterface) => {
  const align = (props.align === 'left' ||
    props.align === 'bottom_left') ? 'left' :
    (props.align === 'right' ||
    props.align === 'bottom_right') ? 'right' : 'center';
  return (
    <div className={`HomeTopSlider__text-wrapper HomeTopSlider__text-wrapper--${props.align}`}>
      <Title
        text={props.name}
        fullWidth={true}
        shadow={true}
        align={align} />
      <div
        className='HomeTopSlider__description'
        dangerouslySetInnerHTML={{__html: props.description || ''}}></div>
      {}
    </div>
  );
};

const HomeTopSlider = (): React.ReactElement => {
  const system: any = useSelector((state: any) => state.system);
  const [swiperReference, setSwiperReference]: any = useState(null);

  const onSwiper = ( swiper: any ) => {
    setSwiperReference(swiper);
  };

  return (
    <>
    {
      system && system.configurations && system.configurations.id &&
        system.configurations.relationships &&
        system.configurations.relationships.home_pictures &&
        system.configurations.relationships.home_pictures.data &&
        system.configurations.relationships.home_pictures.data.length ?
        <div className='HomeTopSlider z-depth-2'>
        <Swiper
          className='Swiper'
          autoplay={true}
          effect='slide'
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          onSwiper={onSwiper}
          pagination={{
            el: '.swiper-pagination', type: 'bullets', clickable: true
          }}
        >
          {
            system.configurations.relationships.home_pictures.data.map((item: any, index: any ) => {
              if ( !item.attributes ) return null;
              return (
                <SwiperSlide
                  className='Swiper__slide'
                  key={index}
                  virtualIndex={index}>
                  <div
                    className='Swiper__content'
                    style={{
                      backgroundImage: `url(${item.attributes.img_picture})`
                    }}>
                    {
                      item.attributes.name ||
                      item.attributes.description ?
                        <SlideText
                          name={item.attributes.name}
                          description={item.attributes.description}
                          align={item.attributes.position} /> : null
                    }
                  </div>
                </SwiperSlide>
              );
            })
          }
          <SlideAddons swiper={swiperReference} />
        </Swiper>
      </div> : null
    }
    </>
  );
};

export default HomeTopSlider;
