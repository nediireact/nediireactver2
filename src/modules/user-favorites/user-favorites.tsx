import React from 'react';
import { useSelector } from 'react-redux';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import StandItemMini from 'src/modules/stand-grid/stand-item-mini';
import BuyableItem from 'src/modules/buyable-item/buyable-item';
import SubTitle from 'src/modules/sub-title/sub-title';
import LoadUserFavoriteStands from 'src/modules/user-favorites/load-user-favorite-stands';
import LoadUserFavoriteItems from 'src/modules/user-favorites/load-user-favorite-items';

const UserFavorites = (): React.ReactElement => {
  const userData = useSelector((state: any) => state.user);
  const stands = userData.favoriteStands || [];
  const items = userData.favoriteItems || [];

  return (
    <div className='col s12 m8'>
      <LoadUserFavoriteStands />
      <LoadUserFavoriteItems />
      {
        stands && stands.length ?
          <>
            <SubTitle
              text='Empresas favoritas'
              fullWidth={true}
              align='left' />
            <HorizontalSpace size='x-small' />
            <div className='row'>
              {
                stands.map((i: any, index: number) => {
                  return (
                    <StandItemMini
                      key={index}
                      cols='col s6 m3'
                      item={i.relationships.stand.data} />
                  );
                })
              }
            </div>
          </> : null
      }
      <HorizontalSpace size='small' />
      {
        items && items.length ?
          <>
            <SubTitle
              text='Elementos favoritos'
              fullWidth={true}
              align='left' />
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
                      <BuyableItem
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
