import React, {
  useEffect,
  useState
} from 'react';
import fetchData from 'src/modules/utils/fetch-data';
import SubTitle from 'src/modules/sub-title/sub-title';
import BuyableItem from 'src/modules/buyable-item/buyable-item';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import { useSelector } from 'react-redux';
import 'src/modules/home-meals-grid/home-meals-grid.scss';

const HomeMealsGrid = (): React.ReactElement => {
  const [items, setitems]: any = useState([]);
  const system = useSelector((state: any) => state.system);
  const prefix = system.platform.prefix;
  const [backgroundIMG, setBackgroundIMG] = useState(`${prefix}assets/is_breakfast.jpg`);
  const [selected, setSelected] = useState('is_breakfast');
  const commonFields = 'name,img_picture,slug,stand,price,final_price,discount,short_description';

  const updateMealType = (type: string): void => {
    const url = `meals/?filter[${type}]=true&page[size]=12&include=stand&fields[Stand]=name,slug&fields[Meal]=${commonFields}`;
    setBackgroundIMG(`${prefix}assets/${type}.jpg`);
    setSelected(type);
    fetchData(url)
    .then((response: any) => {
      setitems(response.data);
    });
  };

  useEffect(() => {
    updateMealType('is_breakfast');
  }, [fetchData]);

  return (
    <div className='HomeMealsGrid__wrapper' style={{backgroundImage: `url(${backgroundIMG})`}}>
      <div className='HomeMealsGrid__blur'>
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
                    <BuyableItem
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
    </div>
  );
};

export default HomeMealsGrid;

