import { UserFavoriteItemsConverter } from 'src/modules/utils/products-services';

export const IsItAFavoriteItem = ( id: number, type: string, items: Array<any> ): any => {
  let isFavorite = null;
  items.forEach((i: any) => {
    if ( i.relationships[UserFavoriteItemsConverter(type)] &&
      i.relationships[UserFavoriteItemsConverter(type)].data &&
      Number(i.relationships[UserFavoriteItemsConverter(type)].data.id) === id &&
      i.relationships[UserFavoriteItemsConverter(type)].data.type === type ) {
      isFavorite = i;
    }
  });
  return isFavorite;
};
