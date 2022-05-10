import React, {
  useEffect
} from 'react';
import { useSelector } from 'react-redux';
import {
  HorizontalSpace,
  StrongText
} from 'rrmc';
import CardHolder from 'src/modules/card-holder/card-holder';
import BuyableItemAdapter from 'src/adapters/buyable-item-adapter/buyable-item-adapter';
import LoadUserFavoriteStands from 'src/modules/user-favorites/load-user-favorite-stands';
import LoadUserFavoriteItems from 'src/modules/user-favorites/load-user-favorite-items';

const UserFavorites = (): React.ReactElement => {
  const userData = useSelector((state: any) => state.user);
  const stands = userData.favoriteStands || [];
  const items = userData.favoriteItems || [];

  useEffect(() => {
    const w: any = window;
    w.scrollTo(0, 0);
  }, [window]);

  return (
    <div className='col s12 m8'>
      <LoadUserFavoriteStands />
      <LoadUserFavoriteItems />
      {
        stands && stands.length ?
          <>
            <StrongText text='Empresas favoritas' fullWidth={true} align='left' />
            <HorizontalSpace size='x-small' />
            <div className='row'>
              {
                stands.map((i: any, index: number) => {
                  return (
                    <CardHolder
                      key={index}
                      cols='col s6 m3'
                      stand={i.relationships.stand.data} />
                  );
                })
              }
            </div>
          </> : null
      }
      <HorizontalSpace size='x-small' />
      {
        items && items.length ?
          <>
            <StrongText text='Elementos favoritas' fullWidth={true} align='left' />
            <HorizontalSpace size='x-small' />
            <div className='row'>
              {
                items.map((i: any, index: number) => {
                  const item = i.relationships.product.data ? i.relationships.product.data :
                    i.relationships.service.data ? i.relationships.service.data :
                    i.relationships.meal.data ? i.relationships.meal.data :
                    i.relationships.real_estate.data ? i.relationships.real_estate.data :
                    i.relationships.vehicle.data ? i.relationships.vehicle.data : null;
                  return (
                    <div key={index} className='col s6 m4'>
                      <BuyableItemAdapter
                        item={item}
                        fullWidth={true}
                        mini={true} />
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

export default UserFavorites;
