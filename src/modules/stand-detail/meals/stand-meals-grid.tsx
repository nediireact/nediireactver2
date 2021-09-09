import React, {
  useEffect,
  useState
} from 'react';
import fetchData from 'src/modules/utils/fetch-data';
import BuyableItem from 'src/modules/buyable-item/buyable-item';
import 'src/modules/stand-detail/meals/stand-meals-grid.scss';

const standMeals: any[] = [];

const StandMeals = (props: any): React.ReactElement => {
  const [meals, setMeals] = useState(standMeals);
  const [classifications, setClassifications] = useState([]);
  const baseURL = `meals/?filter[stand]=${props.standId}&include=classification,meal_addons`;
  const [url, setURL] = useState(baseURL);
  const activeClassifications: string[] = [];

  const refreshData = (e: any) => {
    const value: string = e.target.value;
    const add: boolean = e.target.checked ? true : false;
    if ( add ) {
      activeClassifications.push(value);
    } else {
      const index = activeClassifications.indexOf(value);
      activeClassifications.slice(index, 1);
    }
    console.log('>>>>>>> activeClassifications', activeClassifications, activeClassifications.join(','));
    fetchData(`${baseURL}&filter[classification]=1`)
      .then((response: any) => {
        console.log('meals', standMeals, response, meals);
        setMeals(response.data);
        setClassifications(response.included.filter((i: any) => i.type === 'MealClassification'));
      })
      .catch((error) => {
        console.log('Hubo un error', error);
      });
  };

  useEffect(() => {
    setURL(baseURL);
    fetchData(url)
      .then((response: any) => {
        console.log('meals', standMeals, response, meals);
        setMeals(response.data);
        setClassifications(response.included.filter((i: any) => i.type === 'MealClassification'));
      })
      .catch((error) => {
        console.log('Hubo un error', error);
      });
  }, [fetchData]);

  return (
    <>
    <div className='col s12 m4 StandFilters'>
      <span className='StandFilters__title'>Clasificaciones</span>
      {
        classifications && classifications.length ?
          classifications.map((i: any, index: number) => {
            return (
              <label
                className='StandFilters__classification'
                key={index}>
                <input type='checkbox' value={i.id} onChange={refreshData}/>
                <span>{i.attributes.title}</span>
              </label>
            );
          }) : null
      }
    </div>
    {
      meals && meals.length ?
        <>
        {
          meals.map((i: any, index: number) => {
            return (
              <BuyableItem
                key={index}
                size='col s12 m4'
                colorCard='white'
                item={i.attributes}
                standSlug={props.standSlug}
                truncate={true} />
            );
          })
        }
        </> : null
    }
    </>
  );
};

export default StandMeals;
