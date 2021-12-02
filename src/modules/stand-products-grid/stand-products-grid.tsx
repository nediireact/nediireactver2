import React, {
  useEffect,
  useState
} from 'react';
import fetchData from 'src/modules/utils/fetch-data';
import BuyableItem from 'src/modules/buyable-item/buyable-item';
import 'src/modules/stand-meals-grid/stand-meals-grid.scss';
import 'nouislider/dist/nouislider.css';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import ClassificationComponent from 'src/modules/stand-products-grid/stand-products-classification-filter';
import AddOnsComponent from 'src/modules/stand-products-grid/stand-products-add-on-filter';

const StandProductsGrid = (props: any): React.ReactElement => {
  const [meals, setMeals] = useState([]);
  const baseURL = `products/?filter[stand]=${props.standId}&include=classification`;
  const [classifications, setClassifications] = useState([]);
  const [activeClassifications, setActiveClassifications]: any[] = useState([]);
  const [addOns, setAddOns] = useState([]);
  const [activeAddOn, setActiveAddOn] = useState(null);

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
    const addOnFilter = addOn ? `&filter[features]=${addOn}` : '';
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
        console.log(meals);
        setMeals(meals);
      })
      .catch((error) => console.log('Hubo un error', error));
    fetchData('product-classifications/')
      .then((response: any) => setClassifications(response.data))
      .catch((error) => console.log('Hubo un error', error));
    fetchData('product-feature-options/')
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
                  type='producto'
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

export default StandProductsGrid;
