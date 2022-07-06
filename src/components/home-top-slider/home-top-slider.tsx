import React, {
  useEffect,
  useState
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  Swiper,
  SwiperSlide
} from 'swiper/react';
import { Link } from 'react-router-dom';
import {
  PictureSlider,
  LoadingIndicator
} from 'rrmc';
import fetchData from 'src/modules/utils/fetch-data';
import SetSystemData from 'src/redux/actions/set-system-data';

const sliderNextButtonFile = '/assets/slider-button-next.svg';
const sliderPrevButtonFile = '/assets/slider-button-prev.svg';

const HomeTopSlider = (): React.ReactElement => {
  const dispatch = useDispatch();
  const system: any = useSelector((state: any) => state.system);
  const [isLoading, setIsLoading] = useState(false);
  const items = system && system.homePictures ? system.homePictures : [];
  const prefix = system.platform.prefix;
  const sliderNextButtonFileURL = `${prefix}${sliderNextButtonFile}`;
  const sliderPrevButtonFileURL = `${prefix}${sliderPrevButtonFile}`;

  useEffect(() => {
    setIsLoading(true);
    fetchData('system/?include=home_pictures')
      .then((response: any) =>{
        setIsLoading(false);
        const data = response.data && response.data.length ?
          response.data[0] : null;
        if ( data && data.relationships &&
            data.relationships.home_pictures &&
            data.relationships.home_pictures.data &&
            data.relationships.home_pictures.data.length ) {
          const homePictures = data.relationships.home_pictures.data;
          dispatch(SetSystemData({
            homePictures: homePictures
          }));
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [fetchData]);

  return (
    <>
    <LoadingIndicator isLoading={isLoading} />
    {
      items && items.length ?
          <PictureSlider
            items={items}
            sliderNextButtonFileURL={sliderNextButtonFileURL}
            sliderPrevButtonFileURL={sliderPrevButtonFileURL}
            Swiper={Swiper}
            SwiperSlide={SwiperSlide}
            Link={Link} /> : null
    }
    </>
  );
};

export default HomeTopSlider;
