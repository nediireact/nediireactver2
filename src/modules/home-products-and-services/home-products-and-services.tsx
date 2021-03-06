import React from 'react';
import { HorizontalSpace } from 'rrmc';
import GenericMiniSlider from 'src/modules/generic-mini-slider/generic-mini-slider';
import 'src/modules/home-products-and-services/home-products-and-services.scss';
import LoadUserFavoriteItems from 'src/modules/user-favorites/load-user-favorite-items';

const HomeProductAndServices = (): React.ReactElement => {
  const commonFields = 'name,img_picture,slug,stand,price,final_price,discount,created,times_selled,short_description';
  const productsURL = `products/?include=stand&fields[Product]=${commonFields}`;
  const servicesURL = `services/?include=stand&fields[Service]=${commonFields}`;
  const vehiclesURL = `vehicles/?include=stand,model,model.make&fields[Vehicle]=${commonFields},model,year&fields[VehicleMake]=name&fields[VehicleModel]=name,make`;
  const mealsURL = `meals/?include=stand&fields[Meal]=${commonFields}`;
  const realEstateURL = `real-estates/?include=stand&fields[RealEstate]=${commonFields}`;

  const standURL = '&fields[Stand]=name,slug&page[number]=1&page[size]=2';
  const bestSeller = '&sort=-times_selled';
  const newItems = '&sort=-created';
  const discounts = '&sort=-discount&filter[discount__gt]=0';

  return (
    <>
    <LoadUserFavoriteItems />
    <HorizontalSpace size='medium' />
    <div className='HomeProductAndServices blue-grey white-text'>
      <div className='container'>
        <div className='row'>
          <GenericMiniSlider
            title='Lo mas vendidos'
            cacheKey='homeBestSeller'
            urls={[
              `${productsURL}${standURL}${bestSeller}`,
              `${servicesURL}${standURL}${bestSeller}`,
              `${vehiclesURL}${standURL}${bestSeller}`,
              `${mealsURL}${standURL}${bestSeller}`,
              `${realEstateURL}${standURL}${bestSeller}`
            ]} />
          <GenericMiniSlider
            title='Articulos del mes'
            cacheKey='homeMonthDeals'
            urls={[
              `${productsURL}${standURL}${newItems}`,
              `${servicesURL}${standURL}${newItems}`,
              `${vehiclesURL}${standURL}${newItems}`,
              `${mealsURL}${standURL}${newItems}`,
              `${realEstateURL}${standURL}${newItems}`
            ]} />
          <GenericMiniSlider
            title='Con descuento'
            cacheKey='homeDeals'
            urls={[
              `${productsURL}${standURL}${discounts}`,
              `${servicesURL}${standURL}${discounts}`,
              `${vehiclesURL}${standURL}${discounts}`,
              `${mealsURL}${standURL}${discounts}`,
              `${realEstateURL}${standURL}${discounts}`
            ]} />
        </div>
      </div>
      <HorizontalSpace size='x-small' />
    </div>
    </>
  );
};

export default HomeProductAndServices;
