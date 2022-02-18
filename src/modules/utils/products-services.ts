export const ProductTypeConverter = ( type: string ): string => {
  let typeParsed = '';
  switch ( type ) {
    case 'Product':
      typeParsed = 'productos';
      break;
    case 'Service':
      typeParsed = 'servicios';
      break;
    case 'Meal':
      typeParsed = 'menu';
      break;
    case 'Vehicle':
      typeParsed = 'vehiculos';
      break;
    case 'RealEstate':
      typeParsed = 'inmuebles';
      break;
    default:
      break;
  }
  return typeParsed;
};

export const UserFavoriteItemsConverter = ( type: string ): string => {
  let typeParsed = '';
  switch ( type ) {
    case 'Product':
      typeParsed = 'product';
      break;
    case 'Service':
      typeParsed = 'service';
      break;
    case 'Meal':
      typeParsed = 'meal';
      break;
    case 'Vehicle':
      typeParsed = 'vehicle';
      break;
    case 'RealEstate':
      typeParsed = 'real_estate';
      break;
    default:
      break;
  }
  return typeParsed;
};
