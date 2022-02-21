import { UserFavoriteItemsConverter } from 'src/modules/utils/products-services';

export const IsItACartItem = ( id: number, type: string, items: Array<any> ): any => {
  let isInCart = null;
  items.forEach((i: any) => {
    if ( i.relationships[UserFavoriteItemsConverter(type)] &&
      i.relationships[UserFavoriteItemsConverter(type)].data &&
      Number(i.relationships[UserFavoriteItemsConverter(type)].data.id) === id &&
      i.relationships[UserFavoriteItemsConverter(type)].data.type === type ) {
        isInCart = i;
    }
  });
  return isInCart;
};
