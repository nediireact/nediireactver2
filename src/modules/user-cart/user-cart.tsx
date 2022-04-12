import React, {
  useState,
  useEffect
} from 'react';
import { useSelector } from 'react-redux';
import {
  HorizontalSpace,
  StrongText
} from 'rrmc';
import LoadUserCart from 'src/modules/user-cart/load-user-cart';
import UserCartItem from 'src/modules/user-cart/user-cart-item';

const UserCart = (): React.ReactElement => {
  const userData = useSelector((state: any) => state.user);
  const items = userData.cart || [];
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const w: any = window;
    w.scrollTo(0, 0);
  });

  return (
    <div className='col s12 m8'>
      <LoadUserCart />
      {
        items && items.length ?
          <>
            <StrongText text='Carrito de compras' fullWidth={true} align='left' />
            <HorizontalSpace size='x-small' />
            <div className='row'>
              {
                items.map((i: any, index: number) => {
                  const item = i.relationships.product.data ? i.relationships.product.data :
                    i.relationships.service.data ? i.relationships.service.data :
                    i.relationships.meal.data ? i.relationships.meal.data :
                    i.relationships.real_estate.data ? i.relationships.real_estate.data :
                    i.relationships.vehicle.data ? i.relationships.vehicle.data : null;
                  if ( !item || !item.relationships || !item.attributes ) return <></>;
                  return (
                    <div key={index} className='col s12'>
                      <UserCartItem
                        item={item}
                        cartItem={i}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                      />
                    </div>
                  );
                })
              }
            </div>
          </> : null
      }
    </div>
  );
};

export default UserCart;
