import React from 'react';
import { useSelector } from 'react-redux';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import GenericHeadDetail from 'src/modules/generic-item-detail/generic-head-detail';
import StandDetailGallery from 'src/modules/stand-detail-gallery/stand-detail-gallery';
import CommonLargeText from 'src/modules/stand-detail/stand-common-large-text';
import GenericItemPrice from 'src/modules/generic-item-detail/generic-item-price';
import FoodTime from 'src/modules/food-time/food-time';
import StandMealsAddons from 'src/modules/stand-meals-detail/stand-meals-addons';
import StrongText from 'src/modules/strong-text/strong-text';
import ItemShoping from 'src/modules/item-shoping/item-shoping';
import 'src/modules/generic-item-detail/generic-item-detail.scss';
import GenericItemDetailFeatures from 'src/modules/generic-item-detail/generic-item-detail-features';
import VehicleAttributes from 'src/modules/vehicle-attributes/vehicle-attributes';
import ServicesAttributes from 'src/modules/services-attributes/services-attributes';
import ProductAttributes from 'src/modules/product-attributes/product-attributes';
import TextWhitIconInfo from 'src/modules/text-with-icon/text-with-icon-info';
import RealStateAttributes from 'src/modules/real-estate-attributes/real-estate-attributes';
import LoadUserFavoriteItems from 'src/modules/user-favorites/load-user-favorite-items';
import { IsItAFavoriteItem } from 'src/modules/utils/user-favorites';

const GenericItemDetail = (props: any): React.ReactElement => {
  const userData = useSelector((state: any) => state.user);
  const user = userData && userData.user && userData.user.id ?
    userData.user : {};
  const name = props.item.type === 'Vehicle' ?
    `${props.item.attributes.year}
    ${props.item.relationships.model.data.relationships.make.data.attributes.name}
    ${props.item.relationships.model.data.attributes.name}` :
    props.item.attributes.name;
  const isFavorite = user && userData.favoriteItems ?
    IsItAFavoriteItem(
      Number(props.item.id),
      props.item.type,
      userData.favoriteItems
    ) : false;

  return (
    <div className='container row GenericItemDetail'>
      <LoadUserFavoriteItems />
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
            <StandDetailGallery images={props.item.relationships.meal_pictures.data} /> : null
        }
        {
           props.item && props.item.type === 'Product' ?
            <StandDetailGallery images={props.item.relationships.product_pictures.data} /> : null
        }
        {
           props.item && props.item.type === 'Service' ?
            <StandDetailGallery images={props.item.relationships.service_pictures.data} /> : null
        }
        {
           props.item && props.item.type === 'Vehicle' ?
            <StandDetailGallery images={props.item.relationships.vehicle_pictures.data} /> : null
        }
        {
           props.item && props.item.type === 'RealEstate' ?
            <StandDetailGallery images={props.item.relationships.real_estate_pictures.data} /> : null
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
            props.item && props.item.type === 'Product' ?
              <>
                {
                  props.item.attributes.unlimited_stock ?
                    <TextWhitIconInfo
                      colorIcon='green-text'
                      icon='sentiment_very_satisfied'
                      text='En stock: siempre' /> :
                    <TextWhitIconInfo
                      colorIcon='green-text'
                      icon='sentiment_very_satisfied'
                      text={`En stock: ${props.item.attributes.stock}`} />
                }
                {
                  props.item.attributes.shipping_cost && props.item.attributes.shipping_cost > 0 ?
                    <TextWhitIconInfo
                      colorIcon='green-text'
                      icon='local_shipping'
                      text={`Costo de envío: ${props.item.attributes.shipping_cost}`} /> :
                    <TextWhitIconInfo
                      colorIcon='green-text'
                      icon='local_shipping'
                      text='Costo de envío: Gratis' />
                }
              </> : null
          }
          {
            props.item && props.item.type === 'Meal' && (
              props.item.attributes.is_breakfast || props.item.attributes.is_meal || props.item.attributes.is_dinner
            ) ? <FoodTime
                  is_breakfast={props.item.attributes.is_breakfast}
                  is_meal={props.item.attributes.is_meal}
                  is_dinner={props.item.attributes.is_dinner} /> : null
          }
          {
            props.item && props.item.type === 'Meal' ?
            <>
              <StrongText text='Adicionales' />
              <StandMealsAddons mealsAddons={props.item.relationships.meal_addons} />
            </> : null
          }
          {
            props.item && (
            props.item.type === 'Product' || props.item.type === 'Vehicle' || props.item.type === 'RealEstate' || props.item.type === 'Service') ?
              <GenericItemDetailFeatures features={props.item.relationships.features} /> : null
          }
          {
            props.item && props.item.type === 'Vehicle' ?
              <VehicleAttributes item={props.item} /> : null
          }
          {
            props.item && props.item.type === 'Service' ?
              <ServicesAttributes item={props.item} /> : null
          }
          {
            props.item && props.item.type === 'Product' ?
              <ProductAttributes item={props.item} /> : null
          }
          {
            props.item && props.item.type === 'RealEstate' ?
              <RealStateAttributes item={props.item} /> : null
          }
          Favorito? {isFavorite ? 'si' : 'no'}
          <HorizontalSpace size='x-small' />
          <ItemShoping />
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
