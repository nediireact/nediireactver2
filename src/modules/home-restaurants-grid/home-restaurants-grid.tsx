import React, {
  useEffect,
  useState
} from 'react';
import {
  Swiper,
  SwiperSlide
} from 'swiper/react';
import { useSelector } from 'react-redux';
import fetchData from 'src/modules/utils/fetch-data';
import {
  HorizontalSpace,
  SubTitle,
  Ratings,
  LoadingIndicator
} from 'rrmc';
import { Link } from 'react-router-dom';
import './home-restaurants-grid.scss';
import BuyableItemAdapter from 'src/adapters/buyable-item-adapter/buyable-item-adapter';

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

const StandItem = (props: any): React.ReactElement => {
  const item = props.item;
  return (
    <div className='HomeRestaurantsGrid__wrapper'
      style={{
        backgroundImage: `url(${item.attributes.img_cover})`
      }}>
      <div className='HomeRestaurantsGrid__gradient'>
        <div className='container row'>
          <div className='col s12 m3'>
            <HorizontalSpace size='small' />
            <Link to={`/empresa/${item.attributes.slug}`}>
              <SubTitle
                text={item.attributes.name}
                color='white'
                shadow={true} />
              <div
                className='HomeRestaurantsGrid__stand-logo z-depth-2'
                style={{
                  backgroundImage: `url(${item.attributes.img_logo})`
                }}></div>
              <HorizontalSpace size='x-small' />
              <Ratings
                score={item.attributes.average_rating}
                size='x-large'
                centered={true} />
            </Link>
          </div>
          <div className='col l1 hide-on-small-only'></div>
          <div className='col s12 m7'>
            <div className='hide-on-small-only'>
              <HorizontalSpace size='small' />
            </div>
            <SubTitle
              text='Platillos destacados'
              color='white'
              align='left'
              fullWidth={true}
              shadow={true} />
            <HorizontalSpace size='x-small' />
            <div className='row'>
              {
                item.relationships && item.relationships.highlighted_meals && item.relationships.highlighted_meals.data ?
                item.relationships.highlighted_meals.data.map((i: any, index: number) => {
                  return (
                    <div key={index} className='col s6'>
                      <BuyableItemAdapter
                        item={i}
                        fullWidth={true}
                        parentSlug={item.attributes.slug}
                        mini={true} />
                    </div>
                  );
                }) : null
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeRestaurantsGrid = (): React.ReactElement => {
  const [swiperReference, setSwiperReference]: any = useState(null);
  const [items, setitems]: any = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const mealFields = 'name,img_picture,slug,price,final_price,discount,average_rating';
  const standFields = 'name,img_logo,img_cover,slug,highlighted_meals,restaurant,average_rating';

  useEffect(() => {
    setIsLoading(true);
    fetchData(`stands/?page[size]=3&fields[Stand]=${standFields}&include=highlighted_meals&fields[Meal]=${mealFields}&filter[restaurant]=true`)
      .then((response: any) =>{
        setIsLoading(false);
        setitems(response.data);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [fetchData]);

  const onSwiper = ( swiper: any ) => {
    setSwiperReference(swiper);
  };

  return (
    <>
    <LoadingIndicator isLoading={isLoading} />
    <HorizontalSpace size='large' />
    <Swiper
      className='Swiper HomeRestaurantsGrid' autoplay={true}
      effect='fade' slidesPerView={1} spaceBetween={20}
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
              <StandItem item={item} />
            </SwiperSlide>
          );
        })
      }
      <SlideAddons swiper={swiperReference} />
    </Swiper>
    </>
  );
};

export default HomeRestaurantsGrid;
