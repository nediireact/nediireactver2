import React, {
  useEffect,
  useState
} from 'react';
import fetchData from 'src/modules/utils/fetch-data';
import BuyableItem from 'src/modules/buyable-item/buyable-item';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import PriceRangeFilter from 'src/modules/price-range-filter/price-range-filter';
import CheckFilter from 'src/modules/check-filter/check-filter';

const urlValues: any = {};

const StandMealsGrid = (props: any): React.ReactElement => {
  const [meals, setMeals] = useState([]);
  const baseURL = `meals/?filter[stand]=${props.stand.id}&include=classification,meal_addons,stand&fields[Stand]=name,slug`;
  const [classifications, setClassifications] = useState([]);
  const [addOns, setAddOns] = useState([]);

  const updateItems = ( updates: any ) => {
    let url = baseURL;
    urlValues[updates.type] = updates.value;
    for (const i in urlValues) {
      if (Object.prototype.hasOwnProperty.call(urlValues, i)) {
        const value = urlValues[i];
        if ( value ) url += value;
      }
    }
    fetchData(url)
      .then((response: any) => {
        const meals = response.data;
        setMeals(meals);
      })
      .catch((error) => {
        console.log('Hubo un error', error);
      });
  };

  useEffect(() => {
    fetchData(baseURL)
      .then((response: any) => {
        const meals = response.data;
        setMeals(meals);
      })
      .catch((error) => console.log('Hubo un error', error));
    fetchData(`meal-classifications/?filter[stand]=${props.stand.id}`)
      .then((response: any) => setClassifications(response.data))
      .catch((error) => console.log('Hubo un error', error));
    fetchData(`meal-addons/?filter[stand]=${props.stand.id}`)
      .then((response: any) => setAddOns(response.data))
      .catch((error) => console.log('Hubo un error', error));
  }, [fetchData]);

  return (
    <div className='container row'>
      <HorizontalSpace size='small' />
      <div className='col s12 m4'>
        <div className='GenericCard'>
          <CheckFilter
            name='Clasificaciones'
            items={[...classifications]}
            filter='classification'
            join={true}
            updateItems={updateItems} />
          <HorizontalSpace size='small' />
          <PriceRangeFilter
            maxPrice={props.stand.attributes.meals_max_price + 100}
            updateItems={updateItems} />
          <HorizontalSpace size='small' />
          <CheckFilter
            name='Ingredientes adicionales'
            items={[...addOns]}
            filter='meal_addons'
            updateItems={updateItems} />
        </div>
      </div>
      {
        meals && meals.length ?
          <>
          {
            meals.map((i: any, index: number) => {
              return (
                <BuyableItem
                  key={index}
                  item={i} />
              );
            })
          }
          </> : null
      }
    </div>
  );
};

export default StandMealsGrid;
