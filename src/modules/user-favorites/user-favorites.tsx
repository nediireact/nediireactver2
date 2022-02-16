import React, {
  useEffect,
  useState
} from 'react';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import { useSelector } from 'react-redux';
import fetchData from 'src/modules/utils/fetch-data';
import StandItemMini from 'src/modules/stand-grid/stand-item-mini';
import BuyableItem from 'src/modules/buyable-item/buyable-item';
import SubTitle from 'src/modules/sub-title/sub-title';

const UserFavorites = (): React.ReactElement => {
  const userData = useSelector((state: any) => state.user);
  const user = userData && userData.user && userData.user.id ?
    userData.user : {};
  const [stands, setStands]: any = useState([]);
  const [items, setItems]: any = useState([]);
  // const standFields = 'name,img_logo,img_cover,slug,highlighted_meals,restaurant,average_rating';
  const commonFields = 'name,img_picture,slug,stand,price,final_price,discount,short_description';

  useEffect(() => {
    // fetchData(`user-favorite-stands/?filter[user]=${user.id}&include=stand&fields=[Stand]=${standFields}`)
    //   .then((response: any) =>{
    //     setStands(response.data);
    //   });
    setStands([]);
    fetchData(`user-favorite-items/?filter[user]=${user.id}&include=product,product.stand&fields[Product]=${commonFields}&fields[Stand]=name,slug`)
      .then((response: any) =>{
        console.log('Output', response);
        setItems(response.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [fetchData]);

  return (
    <div className='col s12 m8'>
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
                  // console.log('i', i, item);
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
