import React, {
  useEffect,
  useState
} from 'react';
import {
  SubTitle,
  HorizontalSpace,
  SizesEnum
} from 'rrmc';
import APISDK from 'src/api/api-sdk';
import BuyableItemAdapter from 'src/components/_adapters/buyable-item-adapter';
import SystemValues from 'src/constants/SystemValues';
import './home-meals-grid.scss';

const HomeMealsGrid = (): React.ReactElement => {
  const homeMealsItems = SystemValues.getInstance().system.homeMealsItems;
  const [items, setItems]: Array<any> = useState([]);
  const prefix = SystemValues.getInstance().system.platform.prefix;
  const [backgroundIMG, setBackgroundIMG] = useState(`${prefix}assets/is_breakfast.jpg`);
  const [selected, setSelected] = useState('is_breakfast');

  const updateMealType = (type: string): void => {
    setBackgroundIMG(`${prefix}assets/${type}.jpg`);
    setSelected(type);
    const items: Array<any> = [];
    const filteredItems = homeMealsItems.filter((i: any) => i.attributes[type]);
    filteredItems.forEach((i: any) => {
      if ( !items.filter((j: any) => i.id === j.id).length ) {
        items.push(i);
      }
    });
    setItems(items);
  };

  useEffect(() => {
    APISDK.GetHomeMeals();
    updateMealType('is_breakfast');
  }, [APISDK]);

  return (
    <div className='HomeMealsGrid__wrapper' style={{backgroundImage: `url(${backgroundIMG})`}}>
      <div className='HomeMealsGrid__content container'>
        <HorizontalSpace size={SizesEnum.x_small} />
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

