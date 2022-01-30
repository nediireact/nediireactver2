import React, {
  useEffect,
  useState
} from 'react';
import {
  Swiper,
  SwiperSlide
} from 'swiper/react';
import { useSelector } from 'react-redux';
import 'src/modules/home-category-slider/home-category-slider.scss';
import fetchData from 'src/modules/utils/fetch-data';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import GroupItem from 'src/modules/group-grid/group-item';
import SubTitle from 'src/modules/sub-title/sub-title';

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

const HomeCategorySlider = (): React.ReactElement => {
  const system: any = useSelector((state: any) => state.system);
  const [swiperReference, setSwiperReference]: any = useState(null);
  const [items, setitems]: any = useState([]);

  useEffect(() => {
    fetchData('groups')
      .then((response: any) =>{
        setitems(response);
      });
  }, [fetchData]);


  const onSwiper = ( swiper: any ) => {
    setSwiperReference(swiper);
  };

  return (
    <div className='container'>
    {
      system && items.data && items.data.length ?
        <div className='HomeCategorySlider'>
        <HorizontalSpace size='medium' />
        <SubTitle text='Categorías' />
        <Swiper
          className='Swiper'
          autoplay={true}
          effect='slide'
          spaceBetween={20}
          slidesPerView={3}
          loop={true}
          onSwiper={onSwiper}
          pagination={{
            el: '.swiper-pagination', type: 'bullets', clickable: true
          }}
        >
          {
            items.data.map((item: any, index: any ) => {
              if ( !item.attributes ) return null;
              return (
                <SwiperSlide
                  className='Swiper__slide'
                  key={index}
                  virtualIndex={index}>
                  <GroupItem
                    key={index}
                    item={item} />
                </SwiperSlide>
              );
            })
          }
          <SlideAddons swiper={swiperReference} />
        </Swiper>
      </div> : null
    }
    </div>
  );
};

export default HomeCategorySlider;
