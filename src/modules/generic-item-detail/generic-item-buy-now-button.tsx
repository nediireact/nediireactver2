import React from 'react';
import { useSelector } from 'react-redux';
import { TextWithIcon } from 'rrmc';
import { GetBuyableItemName } from 'src/modules/utils/products-services';

const GenericItemBuyNowButton = (props: any): React.ReactElement => {
  const item = props.item;
  if ( !item ) return <></>;
  const userData = useSelector((state: any) => state.user);
  const user = userData && userData.user && userData.user.id ? userData.user : null;
  const jwt = user && user.meta && userData.user.meta.access ?
    userData.user.meta.access : null;
  const name = GetBuyableItemName(item);

  const buyNow = () => {
    console.log('Buy now!', name, jwt);
  };

  return (
    <>
      <div className='GenericItemDetail__buy-now' onClick={buyNow}>
        <TextWithIcon
          color_icon='cyan-text'
          icon='credit_card'
          text_color='grey-text text-darken-4'
          text='Comprar ahora'/>
      </div>
    </>
  );
};

export default GenericItemBuyNowButton;
