import React, {
  useEffect,
  useState
} from 'react';
import fetchData from 'src/modules/utils/fetch-data';
import BuyableItem from 'src/modules/buyable-item/buyable-item';
import 'src/modules/stand-detail/meals/stand-meals-grid.scss';
import 'nouislider/dist/nouislider.css';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import ClassificationComponent from 'src/modules/stand-detail/meals/stand-meal-classification-filter';
import AddOnsComponent from 'src/modules/stand-detail/meals/stand-meal-add-on-filter';
// import PriceComponent from 'src/modules/stand-detail/meals/stand-meal-price-filter';

const StandMeals = (props: any): React.ReactElement => {
  const [meals, setMeals] = useState([]);
  const baseURL = `meals/?filter[stand]=${props.standId}&include=classification,meal_addons`;
  const [classifications, setClassifications] = useState([]);
  const [activeClassifications, setActiveClassifications]: any[] = useState([]);
  const [addOns, setAddOns] = useState([]);
  const [activeAddOn, setActiveAddOn] = useState(null);
  // const [maxPrice, setMaxPrice] = useState(0);

  const updateItems = ( updates: any ) => {
    let addOn = activeAddOn;
    if ( updates.addOn || updates.addOn === 0 ) {
      addOn = updates.addOn;
      if ( updates.addOn === 0 ) {
        updates.addOn = null;
        addOn = null;
      }
      setActiveAddOn(addOn);
    }
    if ( updates.classifications ) setActiveClassifications(updates.classifications);
    const classifications = updates.classifications ? updates.classifications : activeClassifications;
    const classificationFilter = classifications.length ? `&filter[classification__in]=${classifications.join(',')}` : '';
    const addOnFilter = addOn ? `&filter[meal_addons]=${addOn}` : '';
    const url = `${baseURL}${classificationFilter}${addOnFilter}`;
    console.log(
      'URL:', url,
      'classifications', classifications,
      'addOn', addOn
    );
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
        // // let max = 0;
        // for (let i = 0; i < meals.length; i++) {
        //   const element = meals[i];
        //   const final_price = element.attributes.final_price;
        //   console.log('final_price:', i, final_price);
        //   // max += Number(final_price);
        // }
        // // max += 10;
        // // setMaxPrice(max);
        console.log(meals);
        setMeals(meals);
      })
      .catch((error) => console.log('Hubo un error', error));
    fetchData('meal-classifications/')
      .then((response: any) => setClassifications(response.data))
      .catch((error) => console.log('Hubo un error', error));
    fetchData('meal-addons/')
      .then((response: any) => setAddOns(response.data))
      .catch((error) => console.log('Hubo un error', error));
  }, [fetchData]);

  return (
    <div className='container row'>
      <HorizontalSpace size='small' />
      <div className='col s12 m4'>
        <div className='StandFilters'>
          <ClassificationComponent
            classifications={classifications}
            activeClassifications={activeClassifications}
            updateItems={updateItems} />
          {/* <HorizontalSpace size='small' />
          <PriceComponent items={meals} maxPrice={maxPrice} setMaxPrice={setMaxPrice} /> */}
          <HorizontalSpace size='small' />
          <AddOnsComponent
            addOns={addOns}
            updateItems={updateItems} />
        </div>
      </div>
      {
        meals && meals.length ?
          <>
          {
            meals.map((i: any, index: number) => {
              return (
                <BuyableItem key={index} size='col s12 m4' truncate={true}
                  colorCard='white'
                  type='platillo'
                  item={i.attributes}
                  standSlug={props.standSlug} />
              );
            })
          }
          </> : null
      }
    </div>
  );
};

export default StandMeals;
