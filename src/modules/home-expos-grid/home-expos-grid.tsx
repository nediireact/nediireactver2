import React, {
  useEffect,
  useState
} from 'react';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import 'src/modules/home-expos-grid/home-expos-grid.scss';
import fetchData from 'src/modules/utils/fetch-data';
import SubTitle from 'src/modules/sub-title/sub-title';
import { Link } from 'react-router-dom';

const HomeExpoGrid = (): React.ReactElement => {
  const [items, setitems]: any = useState([]);

  useEffect(() => {
    fetchData('expos/?page[number]=1&page[size]=6&fields[Expo]=name,slug,img_picture')
      .then((response: any) =>{
        setitems(response.data);
      });
  }, [fetchData]);

  return (
    <div className='HomeExpoGrid container row'>
    <HorizontalSpace size='medium' />
    <SubTitle text='Expos Nedii' />
    {
      items && items.length ?
        items.map((i: any, index: number) => {
          return (
            <Link
              to={`/expos/${i.attributes.slug}`}
              className='HomeExpoGrid__item col s12 m6 l4' key={index}>
              <div
                className='HomeExpoGrid__image'
                style={{
                  backgroundImage: `url(${i.attributes.img_picture}`
                }}>
              </div>
              <span className='HomeExpoGrid__name'>
                {i.attributes.name}
              </span>
            </Link>
          );
        }) : null
    }
    <HorizontalSpace size='medium' />
    </div>
  );
};

export default HomeExpoGrid;
