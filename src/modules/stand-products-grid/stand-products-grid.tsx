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

const StandProductsGrid = (props: any): React.ReactElement => {
  const [meals, setMeals] = useState([]);
  const baseURL = `products/?filter[stand]=${props.stand.id}&include=classification,stand&fields[Stand]=name,slug`;
  const [classifications, setClassifications] = useState([]);
  const [addOns, setAddOns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateItems = ( updates: any ) => {
    let url = baseURL;
    urlValues[updates.type] = updates.value;
    for (const i in urlValues) {
      if (Object.prototype.hasOwnProperty.call(urlValues, i)) {
        const value = urlValues[i];
        if ( value ) url += value;
      }
    }
    setIsLoading(true);
    fetchData(url)
      .then((response: any) => {
        const meals = response.data;
        setMeals(meals);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('Hubo un error', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData(baseURL)
      .then((response: any) => {
        const meals = response.data;
        setMeals(meals);
        setIsLoading(false);
      })
      .catch((error) => console.log('Hubo un error', error));
    fetchData(`product-classifications/?filter[stand]=${props.stand.id}`)
      .then((response: any) => setClassifications(response.data))
      .catch((error) => console.log('Hubo un error', error));
    fetchData(`product-feature-options/?filter[feature__stand]=${props.stand.id}`)
      .then((response: any) => setAddOns(response.data))
      .catch((error) => console.log('Hubo un error', error));
  }, [fetchData]);

  return (
    <div className='container row'>
      {
        isLoading ?
          <>
            <div className='progress'>
              <div className='indeterminate'></div>
            </div>
          </> : null
      }
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
            maxPrice={props.stand.attributes.products_max_price + 100}
            updateItems={updateItems} />
          <HorizontalSpace size='small' />
          <CheckFilter
            name='Caracteristicas adicionales'
            items={[...addOns]}
            filter='features'
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

export default StandProductsGrid;
