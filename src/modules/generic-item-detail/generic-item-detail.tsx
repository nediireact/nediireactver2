import React from 'react';
import 'src/modules/generic-item-detail/generic-item-detail.scss';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import GenericHeaderDetail from 'src/modules/generic-item-detail/generic-header-detail';
import GenericItemGallery from 'src/modules/generic-item-detail/generic-item-gallery';
import CommonLargeText from 'src/modules/stand-detail/stand-common-large-text';
import GenericItemPrice from 'src/modules/generic-item-detail/generic-item-price';
import GenericItemDetailMealsAvailability from 'src/modules/generic-item-detail/generic-item-meal-availability';
import StandMealsAddons from 'src/modules/stand-meals-detail/stand-meals-addons';
import StrongText from 'src/modules/strong-text/strong-text';
import GenericItemDetailFeatures from 'src/modules/generic-item-detail/generic-item-detail-features';
import VehicleAttributes from 'src/modules/vehicle-attributes/vehicle-attributes';
import ServicesAttributes from 'src/modules/services-attributes/services-attributes';
import ProductAttributes from 'src/modules/product-attributes/product-attributes';
import RealStateAttributes from 'src/modules/real-estate-attributes/real-estate-attributes';
import LoadUserFavoriteItems from 'src/modules/user-favorites/load-user-favorite-items';
import LoadUserCart from 'src/modules/user-cart/load-user-cart';
import GenericItemStockInfo from 'src/modules/generic-item-detail/generic-item-stock-info';
import GenericItemShippingInfo from 'src/modules/generic-item-detail/generic-item-shipping-info';
import GenericItemAddToCartButton from 'src/modules/generic-item-detail/generic-item-add-to-cart-button';
import GenericItemAddToFavoritesButton from 'src/modules/generic-item-detail/generic-item-add-to-favorites-button';
import GenericItemBuyNowButton from 'src/modules/generic-item-detail/generic-item-buy-now-button';

const GenericItemDetail = (props: any): React.ReactElement => {
  const item = props.item;
  if ( !item || !item.attributes ) return <></>;

  return (
    <div className='container row GenericItemDetail'>
      <LoadUserFavoriteItems />
      <LoadUserCart />
      <div className='col s12 m8'>
        <div className='hide-on-med-and-up'>
          <HorizontalSpace size='small' />
          <GenericHeaderDetail item={item} />
        </div>
        <GenericItemGallery item={item} />
        <div className='Description-movil hide-on-small-only'>
          <CommonLargeText text={item.attributes.description} />
        </div>
      </div>
      <HorizontalSpace size='small' />
      <div className='col s12 m4'>
        <div className='GenericCard'>
          <GenericHeaderDetail item={item} />
          <GenericItemPrice
            discount={item.attributes.discount}
            price={item.attributes.price}
            final_price={item.attributes.final_price} />
          <GenericItemStockInfo item={item} />
          <GenericItemShippingInfo item={item} />
          { item && item.type === 'Meal' ?
            <>
              <GenericItemDetailMealsAvailability item={item} />
              <StandMealsAddons item={item} />
            </> : null }
          { item && item.type !== 'Meal' ? <StrongText text='Caracteristicas' fullWidth={true} /> : null }
          <GenericItemDetailFeatures item={props.item} />
          { props.item && props.item.type === 'Vehicle' ? <VehicleAttributes item={props.item} /> : null }
          { props.item && props.item.type === 'Service' ? <ServicesAttributes item={props.item} /> : null }
          { props.item && props.item.type === 'Product' ? <ProductAttributes item={props.item} /> : null }
          { props.item && props.item.type === 'RealEstate' ? <RealStateAttributes item={props.item} /> : null }
          <GenericItemAddToCartButton item={props.item} />
          <GenericItemAddToFavoritesButton />
          <GenericItemBuyNowButton item={props.item} />
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
