import React, {
  useEffect,
  useState
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  SubTitle,
  HorizontalSpace,
  LoadingIndicator
} from 'rrmc';
import './home-meals-grid.scss';
import fetchData from 'src/modules/utils/fetch-data';
import BuyableItemAdapter from 'src/adapters/buyable-item-adapter/buyable-item-adapter';
import SetSystemData from 'src/redux/actions/set-system-data';

const HomeMealsGrid = (): React.ReactElement => {
  const dispatch = useDispatch();
  const system = useSelector((state: any) => state.system);
  const [isLoading, setIsLoading] = useState(false);
  const homeMealsGridItems = system && system.homeMealsGridItems ? system.homeMealsGridItems : [];
  const [items, setItems]: Array<any> = useState([]);
  const prefix = system.platform.prefix;
  const [backgroundIMG, setBackgroundIMG] = useState(`${prefix}assets/is_breakfast.jpg`);
  const [selected, setSelected] = useState('is_breakfast');
  const commonFields = 'name,img_picture,slug,stand,price,final_price,discount,short_description,is_breakfast,is_meal,is_dinner';

  const updateMealType = (type: string): void => {
    setBackgroundIMG(`${prefix}assets/${type}.jpg`);
    setSelected(type);
    const items: Array<any> = [];
    const filteredItems = homeMealsGridItems.filter((i: any) => i.attributes[type]);
    filteredItems.forEach((i: any) => {
      if ( !items.filter((j: any) => i.id === j.id).length ) {
        items.push(i);
      }
    });
    setItems(items);
  };

  useEffect(() => {
    setIsLoading(true);
    updateMealType('is_breakfast');
    const promises = [];
    const url = `meals/?page[size]=12&include=stand&fields[Stand]=name,slug&fields[Meal]=${commonFields}`;
    promises.push(new Promise((res) => {
      fetchData(`${url}&filter[is_breakfast]=true`)
        .then((response: any) => {
          res(response.data);
        });
    }));
    promises.push(new Promise((res) => {
      fetchData(`${url}&filter[is_meal]=true`)
        .then((response: any) => {
          res(response.data);
        });
    }));
    promises.push(new Promise((res) => {
      fetchData(`${url}&filter[is_dinner]=true`)
        .then((response: any) => {
          res(response.data);
        });
    }));
    Promise.all(promises)
      .then((data: any) => {
        setIsLoading(false);
        const results: Array<any> = [];
        data.forEach((i: any) => {
          i.forEach((j: any) => {
            results.push(j);
          });
        });
        dispatch(SetSystemData({
          homeMealsGridItems: results
        }));
      })
      .catch((error) => {
        setIsLoading(false);
        console.log('error', error);
      });
  }, [fetchData]);

  return (
    <div className='HomeMealsGrid__wrapper' style={{backgroundImage: `url(${backgroundIMG})`}}>
      <LoadingIndicator isLoading={isLoading} />
      <div className='HomeMealsGrid__content container'>
        <HorizontalSpace size='x-small' />
        <div className='row'>
          <div className={`col s12 m4 HomeMealsGrid__button ${selected === 'is_breakfast' ? 'HomeMealsGrid__selected' : ''}`}
            onClick={() => {
              updateMealType('is_breakfast');
            }}>
            <SubTitle
              text='Vamos a desayunar'
              fullWidth={true}
              color='white'
              shadow={true} />
          </div>
          <div className={`col s12 m4 HomeMealsGrid__button ${selected === 'is_meal' ? 'HomeMealsGrid__selected' : ''}`}
            onClick={() => {
              updateMealType('is_meal');
            }}>
            <SubTitle
              text='Vamos a comer'
              fullWidth={true}
              color='white'
              shadow={true} />
          </div>
          <div className={`col s12 m4 HomeMealsGrid__button ${selected === 'is_dinner' ? 'HomeMealsGrid__selected' : ''}`}
            onClick={() => {
              updateMealType('is_dinner');
            }}>
            <SubTitle
              text='Vamos a cenar'
              fullWidth={true}
              color='white'
              shadow={true} />
          </div>
        </div>
        <div className='row'>
          {
            items && items.length ?
              items.map((i: any, index: number) => {
                return (
                  <div key={index} className='col s6 m4 l3'>
                    <BuyableItemAdapter
                      mini={true}
                      fullWidth={true}
                      item={i} />
                  </div>
                );
              }) : null
          }
        </div>
      </div>
    </div>
  );
};

export default HomeMealsGrid;

