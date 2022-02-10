import React, {
  useEffect,
  useState
} from 'react';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import fetchData from 'src/modules/utils/fetch-data';
import SubTitle from 'src/modules/sub-title/sub-title';
import StandItemMini from 'src/modules/stand-grid/stand-item-mini';
import 'src/modules/home-stands-grid/home-stands-grid.scss';

interface HomeStandsGridInterface {
  onlyRestaurants?: boolean;
}

const HomeStandsGrid = (props: HomeStandsGridInterface): React.ReactElement => {
  const [items, setitems]: any = useState([]);
  const fields = 'name,slug,img_logo,restaurant,average_rating';
  const url = props.onlyRestaurants ? `stands/?filter[restaurant]=true&page[number]=1&page[size]=6&fields[Stand]=${fields}` :
    `stands/?page[number]=1&page[size]=6&fields[Stand]=${fields}`;
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
            <StandItemMini
              key={index}
              cols={cols}
              item={i}
              onlyRestaurants={props.onlyRestaurants} />
          );
        }) : null
    }
    <HorizontalSpace size='medium' />
    </div>
  );
};

export default HomeStandsGrid;
