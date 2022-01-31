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
