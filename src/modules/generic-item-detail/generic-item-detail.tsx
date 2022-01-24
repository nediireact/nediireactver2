import React from 'react';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import GenericHeadDetail from 'src/modules/generic-item-detail/generic-head-detail';
import StandPictures from 'src/modules/stand-detail/stand-pictures';
import CommonLargeText from 'src/modules/stand-detail/stand-common-large-text';
import GenericItemPrice from 'src/modules/generic-item-detail/generic-item-price';
import FoodTime from 'src/modules/food-time/food-time';
import StandMealsAddons from 'src/modules/stand-meals-detail/stand-meals-addons';
import StrongText from 'src/modules/strong-text/strong-text';
import ItemShoping from 'src/modules/item-shoping/item-shoping';
import 'src/modules/generic-item-detail/generic-item-detail.scss';

const GenericItemDetail = (props: any): React.ReactElement => {
  const name = props.item.type === 'Vehicle' ?
    `${props.item.attributes.year}
    ${props.item.relationships.model.data.relationships.make.data.attributes.name}
    ${props.item.relationships.model.data.attributes.name}` :
    props.item.attributes.name;

  return (
    <div className='container row'>
      <div className="col s12 m8">
        <div className='hide-on-med-and-up'>
          <HorizontalSpace size='small' />
          <GenericHeadDetail
            times_selled={props.item.attributes.times_selled}
            category={props.item.relationships.classification.data.attributes.name}
            name={name} />
        </div>
        {
           props.item && props.item.type === 'Meal' ?
           <StandPictures images={props.item.relationships.meal_pictures.data}/> : null
        }
        {
           props.item && props.item.type === 'Product' ?
           <StandPictures images={props.item.relationships.product_pictures.data}/> : null
        }
        {
           props.item && props.item.type === 'Service' ?
           <StandPictures images={props.item.relationships.service_pictures.data}/> : null
        }
        {
           props.item && props.item.type === 'Vehicle' ?
           <StandPictures images={props.item.relationships.vehicle_pictures.data}/> : null
        }
        {
           props.item && props.item.type === 'RealEstate' ?
           <StandPictures images={props.item.relationships.real_estate_pictures.data}/> : null
        }
        <div className='Description-movil hide-on-small-only'>
          <CommonLargeText text={props.item.attributes.description} />
        </div>
      </div>
      <HorizontalSpace size='small' />
      <div className='col s12 m4'>
        <div className='GenericCard'>
          <GenericHeadDetail
            times_selled={props.item.attributes.times_selled}
            category={props.item.relationships.classification.data.attributes.name}
            name={name} />
          <GenericItemPrice
            discount={props.item.attributes.discount}
            price={props.item.attributes.price}
            final_price={props.item.attributes.final_price} />
          {
            props.item && props.item.type === 'Meal' && (
              props.item.attributes.is_breakfast || props.item.attributes.is_meal || props.item.attributes.is_dinner
            ) ? <FoodTime /> : null
          }
          {
            props.item && props.item.type === 'Meal' ?
            <>
              <StrongText text='Adicionales' />
              <StandMealsAddons mealsAddons={props.item.relationships.meal_addons} />
            </> : null
          }
          <ItemShoping/>
        </div>
      </div>
      <div className='hide-on-med-and-up col s12'>
        <HorizontalSpace size='x-small' />
        <CommonLargeText text={props.item.attributes.description} />
        <HorizontalSpace size='small' />
      </div>
    </div>
  );
};

export default GenericItemDetail;
