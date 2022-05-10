import React, {
  useEffect,
  useState
} from 'react';
import {
  HorizontalSpace,
  SubTitle,
  LoadingIndicator
} from 'rrmc';
import fetchData from 'src/modules/utils/fetch-data';
import StandItemMini from 'src/modules/stand-grid/stand-item-mini';
import LoadUserFavoriteStands from 'src/modules/user-favorites/load-user-favorite-stands';
import 'src/modules/home-stands-grid/home-stands-grid.scss';

interface HomeStandsGridInterface {
  onlyRestaurants?: boolean;
}

const HomeStandsGrid = (props: HomeStandsGridInterface): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setitems]: any = useState([]);
  const fields = 'name,slug,img_logo,restaurant,average_rating';
  const url = props.onlyRestaurants ? `stands/?filter[restaurant]=true&page[number]=1&page[size]=6&fields[Stand]=${fields}` :
    `stands/?page[number]=1&page[size]=6&fields[Stand]=${fields}`;
  const cols = props.onlyRestaurants ? 'col s6 m4' : 'col s6 m3 l2';
  const title = props.onlyRestaurants ? 'Restaurantes' : 'Nuestros expositores';

  useEffect(() => {
    setIsLoading(true);
    fetchData(url)
      .then((response: any) =>{
        setIsLoading(false);
        setitems(response.data);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [fetchData]);

  return (
    <div className='HomeStandsGrid container row'>
      <LoadingIndicator isLoading={isLoading} />
      <LoadUserFavoriteStands />
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
