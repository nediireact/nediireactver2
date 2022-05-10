import React, {
  useEffect,
  useState
} from 'react';
import {
  HorizontalSpace,
  SubTitle,
  LoadingIndicator
} from 'rrmc';
import './home-expos-grid.scss';
import fetchData from 'src/modules/utils/fetch-data';
import { Link } from 'react-router-dom';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import SetSystemData from 'src/redux/actions/set-system-data';

const HomeExpoGrid = (): React.ReactElement => {
  const dispatch = useDispatch();
  const system: any = useSelector((state: any) => state.system);
  const [isLoading, setIsLoading] = useState(false);
  const items = system && system.homeExpos ? system.homeExpos : [];

  useEffect(() => {
    setIsLoading(true);
    fetchData('expos/?page[number]=1&page[size]=6&fields[Expo]=name,slug,img_picture')
      .then((response: any) =>{
        setIsLoading(false);
        dispatch(SetSystemData({
          homeExpos: response.data
        }));
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [fetchData]);

  return (
    <div className='HomeExpoGrid container row'>
    <LoadingIndicator isLoading={isLoading} />
    <HorizontalSpace size='medium' />
    <SubTitle text='Expos Nedii' />
    {
      items && items.length ?
        items.map((i: any, index: number) => {
          return (
            <Link
              to={`/expos/${i.attributes.slug}`}
              className='HomeExpoGrid__item col s6 l4' key={index}>
              <div
                className='HomeExpoGrid__image'
                style={{
                  backgroundImage: `url(${i.attributes.img_picture}`
                }}>
              </div>
              <div className='HomeExpoGrid__flex-filler'></div>
              <span className='HomeExpoGrid__name grey-text text-darken-4'>
                {i.attributes.name}
              </span>
              <div className='HomeExpoGrid__flex-filler'></div>
            </Link>
          );
        }) : null
    }
    <HorizontalSpace size='medium' />
    </div>
  );
};

export default HomeExpoGrid;
