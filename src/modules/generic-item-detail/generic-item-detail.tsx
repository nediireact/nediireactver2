/* eslint-disable max-lines-per-function */
import React from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import GenericHeadDetail from 'src/modules/generic-item-detail/generic-head-detail';
import StandDetailGallery from 'src/modules/stand-detail-gallery/stand-detail-gallery';
import CommonLargeText from 'src/modules/stand-detail/stand-common-large-text';
import GenericItemPrice from 'src/modules/generic-item-detail/generic-item-price';
import FoodTime from 'src/modules/food-time/food-time';
import StandMealsAddons from 'src/modules/stand-meals-detail/stand-meals-addons';
import StrongText from 'src/modules/strong-text/strong-text';
import TextWithIcon from 'src/modules/text-with-icon/text-with-icon';
import 'src/modules/generic-item-detail/generic-item-detail.scss';
import GenericItemDetailFeatures from 'src/modules/generic-item-detail/generic-item-detail-features';
import VehicleAttributes from 'src/modules/vehicle-attributes/vehicle-attributes';
import ServicesAttributes from 'src/modules/services-attributes/services-attributes';
import ProductAttributes from 'src/modules/product-attributes/product-attributes';
import TextWhitIconInfo from 'src/modules/text-with-icon/text-with-icon-info';
import RealStateAttributes from 'src/modules/real-estate-attributes/real-estate-attributes';
import LoadUserFavoriteItems from 'src/modules/user-favorites/load-user-favorite-items';
import { UserFavoriteItemsConverter } from 'src/modules/utils/products-services';
import { IsItAFavoriteItem } from 'src/modules/utils/is-item-in-user-favorites';
import {
  AddCartItem,
  DeleteCartItem
} from 'src/modules/user-cart/user-cart-api-calls';
import NewCartItem from 'src/modules/user-cart/new-cart-item.json';
import { UserCartAddItem } from 'src/redux/actions/user-cart';
import { UserCartDeleteItem } from 'src/redux/actions/user-cart';
import { IsItACartItem } from 'src/modules/utils/is-item-in-user-cart';

const GenericItemDetail = (props: any): React.ReactElement => {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user);
  const user = userData && userData.user && userData.user.id ?
    userData.user : {};
  const jwt = user && user.meta && userData.user.meta.access ?
    userData.user.meta.access : null;
  const name = props.item.type === 'Vehicle' ?
    `${props.item.attributes.year}
    ${props.item.relationships.model.data.relationships.make.data.attributes.name}
    ${props.item.relationships.model.data.attributes.name}` :
    props.item.attributes.name;
  const isFavorite = user && userData && userData.favoriteItems && userData.favoriteItems.length ?
    IsItAFavoriteItem(
      Number(props.item.id),
      props.item.type,
      userData.favoriteItems
    ) : null;
  const isInUserCart = user && userData && userData.cart && userData.cart.length ?
    IsItACartItem(
      Number(props.item.id),
      props.item.type,
      userData.cart
    ) : null;

  const addItem = () => {
    if ( !user || !user.id || !jwt ) return;
    const data: any = { ...NewCartItem };
    const userName = `${user.attributes.first_name} ${user.attributes.last_name}`;
    data.data.relationships.user.data = null;
    data.data.relationships.product.data = null;
    data.data.relationships.meal.data = null;
    data.data.relationships.real_estate.data = null;
    data.data.relationships.service.data = null;
    data.data.relationships.vehicle.data = null;
    data.data.attributes.backup_name = name;
    data.data.attributes.backup_user_name = userName;
    data.data.relationships.user.data = {
      type: 'User',
      id: user.id
    };
    data.data.relationships[UserFavoriteItemsConverter(props.item.type)].data = {
      id: props.item.id,
      type: props.item.type
    };
    AddCartItem(data, jwt)
      .then((res: any) => {
        const itemAdded = { ...res };
        if ( itemAdded.attributes && itemAdded.relationships &&
          itemAdded.relationships[UserFavoriteItemsConverter(props.item.type)] &&
          itemAdded.relationships[UserFavoriteItemsConverter(props.item.type)].data ) {
          itemAdded.relationships[UserFavoriteItemsConverter(props.item.type)].data = { ...props.item };
          dispatch(UserCartAddItem(itemAdded));
        }
      })
      .catch((err) => {
        console.log('Error', err.toString(), '\nData sent:', data);
      });
  };

  const deleteItem = (id: number) => {
    DeleteCartItem(id)
      .then(() => {
        dispatch(UserCartDeleteItem(id));
      })
      .catch((err) => {
        console.log('Error', err);
      });
  };

  return (
    <div className='container row GenericItemDetail'>
      <LoadUserFavoriteItems />
      <div className='col s12 m8'>
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
          {
            isInUserCart && isInUserCart.id ?
              <div className='GenericItemDetail__add-item-to-cart' onClick={() => {
                deleteItem(Number(isInUserCart.id));
              }}>
                <TextWithIcon
                  color_icon='red-text'
                  icon='cancel'
                  text_color='grey-text text-darken-4'
                  text='Eliminar del carrito' />
              </div> :
              <div className='GenericItemDetail__add-item-to-cart' onClick={addItem}>
                <TextWithIcon
                  color_icon='cyan-text'
                  icon='add_shopping_cart'
                  text_color='grey-text text-darken-4'
                  text='Agregar al carrito' />
              </div>
          }
          <TextWithIcon
            color_icon='cyan-text'
            icon='credit_card'
            text_color='grey-text text-darken-4'
            text='Comprar ahora'/>
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
