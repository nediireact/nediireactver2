import React, {
  useEffect,
  useState
} from 'react';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import 'src/modules/home-stands-grid/home-stands-grid.scss';
import fetchData from 'src/modules/utils/fetch-data';
import SubTitle from 'src/modules/sub-title/sub-title';
import { Link } from 'react-router-dom';

interface HomeStandsGridInterface {
  onlyRestaurants?: boolean;
}

const HomeStandsGrid = (props: HomeStandsGridInterface): React.ReactElement => {
  const [items, setitems]: any = useState([]);
  const url = props.onlyRestaurants ? 'stands/?filter[restaurant]=true&page[number]=1&page[size]=6&fields[Stand]=name,slug,img_logo' :
    'stands/?page[number]=1&page[size]=6&fields[Stand]=name,slug,img_logo';
  const cols = props.onlyRestaurants ? 'col s6 m4' : 'col s6 m3 l2';
  const title = props.onlyRestaurants ? 'Restaurantes' : 'Nuestros expositores';

  useEffect(() => {
    fetchData(url)
      .then((response: any) =>{
        setitems(response.data);
      });
  }, [fetchData]);

  return (
    <div className='HomeStandsGrid container row'>
    <HorizontalSpace size='medium' />
    <SubTitle text={title} />
    {
      items && items.length ?
        items.map((i: any, index: number) => {
          return (
            <div className={`HomeStandsGrid__item-wrapper ${cols}`} key={index}>
              <Link
                to={`/empresa/${i.attributes.slug}`}
                className='HomeStandsGrid__item z-depth-1'>
                <div
                  className={`HomeStandsGrid__image ${ props.onlyRestaurants ?
                    'HomeStandsGrid__image--restaurants' : ''
                  }`}
                  style={{
                    backgroundImage: `url(${i.attributes.img_logo}`
                  }}>
                </div>
                <span className='HomeStandsGrid__name truncate'>
                  {i.attributes.name}
                </span>
              </Link>
            </div>
          );
        }) : null
    }
    <HorizontalSpace size='medium' />
    </div>
  );
};

export default HomeStandsGrid;
