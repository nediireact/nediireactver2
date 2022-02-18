import { UserFavoriteItemsConverter } from 'src/modules/utils/products-services';

export const IsItAFavoriteItem = ( id: number, type: string, items: Array<any> ): boolean => {
  let isFavorite = false;
  items.forEach((i: any) => {
    if ( i.relationships[UserFavoriteItemsConverter(type)] &&
      i.relationships[UserFavoriteItemsConverter(type)].data &&
      Number(i.relationships[UserFavoriteItemsConverter(type)].data.id) === id &&
      i.relationships[UserFavoriteItemsConverter(type)].data.type === type ) {
      isFavorite = true;
    }
  });
  return isFavorite;
};
