import React, {
  useEffect,
  useState
} from 'react';
import {
  Swiper,
  SwiperSlide
} from 'swiper/react';
import { useSelector } from 'react-redux';
import 'src/modules/generic-mini-slider/generic-mini-slider.scss';
import fetchData from 'src/modules/utils/fetch-data';
import SubTitle from 'src/modules/sub-title/sub-title';
import BuyableItem from 'src/modules/buyable-item/buyable-item';

const sliderNextButtonFile = '/assets/slider-button-2-next.svg';
const sliderPrevButtonFile = '/assets/slider-button-2-prev.svg';

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

interface GenericMiniSliderInterface {
  urls: Array<any>;
  stand?: any;
  title: string;
}

const GenericMiniSlider = (props: GenericMiniSliderInterface): React.ReactElement => {
  const [swiperReference, setSwiperReference]: any = useState(null);
  const [items, setitems]: any = useState([]);

  useEffect(() => {
    const promises: any[] = [];
    props.urls.forEach((i: string) => {
      promises.push(new Promise((res) => {
        fetchData(i)
        .then((response: any) =>{
          res(response);
        });
      }));
    });

    Promise.all(promises)
      .then((data: any) => {
        const results: Array<any> = [];
        data.forEach((i: any) => {
          i.data.forEach((j: any) => {
            results.push(j);
          });
        });
        setitems(results);
      })
      .catch((err: any) => {
        console.log('error:', err);
      });
  }, [fetchData]);


  const onSwiper = ( swiper: any ) => {
    setSwiperReference(swiper);
  };

  return (
    <>
    {
      items && items.length ?
        <div className='GenericMiniSlider col s12 m6 l4'>
          <SubTitle
            text={props.title}
            color='white'
            shadow={true} />
          <Swiper
            className='Swiper' autoplay={false} effect='coverflow'
            slidesPerView={1} spaceBetween={20}
            loop={true} onSwiper={onSwiper}
            pagination={{
              el: '.swiper-pagination', type: 'bullets', clickable: true
            }}>
            {
              items.map((item: any, index: any ) => {
                if ( !item.attributes ) return null;
                return (
                  <SwiperSlide
                    className='Swiper__slide'
                    key={index}
                    virtualIndex={index}>
                    <BuyableItem
                      key={index}
                      item={item}
                      fullWidth={true} />
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

export default GenericMiniSlider;
