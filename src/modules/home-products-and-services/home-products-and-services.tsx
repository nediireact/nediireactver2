import React from 'react';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import GenericMiniSlider from 'src/modules/generic-mini-slider/generic-mini-slider';
import 'src/modules/home-products-and-services/home-products-and-services.scss';

const HomeProductAndServices = (): React.ReactElement => {
  const productsURL = 'products/?include=stand';
  const servicesURL = 'services/?include=stand';
  const vehiclesURL = 'vehicles/?include=stand,model,model.make';
  const mealsURL = 'meals/?include=stand';
  const realEstateURL = 'real-estates/?include=stand';

  const standURL = '&fields[Stand]=name,slug&page[number]=1&page[size]=1';
  const bestSeller = '&sort=-times_selled';
  const newItems = '&sort=-created';
  const discounts = '&sort=-discount&filter[discount__gt]=0';

  return (
    <>
    <HorizontalSpace size='medium' />
    <div className='HomeProductAndServices blue-grey white-text'>
      <div className='container'>
        <div className='row'>
          <GenericMiniSlider
            title='Lo mas vendidos'
            urls={[
              `${productsURL}${standURL}${bestSeller}`,
              `${servicesURL}${standURL}${bestSeller}`,
              `${vehiclesURL}${standURL}${bestSeller}`,
              `${mealsURL}${standURL}${bestSeller}`,
              `${realEstateURL}${standURL}${bestSeller}`
            ]} />
          <GenericMiniSlider
            title='Articulos del mes'
            urls={[
              `${productsURL}${standURL}${newItems}`,
              `${servicesURL}${standURL}${newItems}`,
              `${vehiclesURL}${standURL}${newItems}`,
              `${mealsURL}${standURL}${newItems}`,
              `${realEstateURL}${standURL}${newItems}`
            ]} />
          <GenericMiniSlider
            title='Con descuento'
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
