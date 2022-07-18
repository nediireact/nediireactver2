import { APIPost } from 'src/api/communicator';
import store from 'src/redux/store';

export const AddBuyableItem = (item: any): Promise<any> => {
  return new Promise((res, rej) => {
    const user = store && store.getState().user &&
      store.getState().user.user &&
      store.getState().user.user.id ?
      store.getState().user.user : null;
    if ( !user ) return rej(new Error('no user'));
    const data: any = {
      data: {
        type: item.itemType,
        attributes: item,
        relationships: {
          stand: {
            data: {
              type: 'Stand',
              id: item.stand
            }
          },
          classification: {
            data: {
              type: item.itemClassificacionType,
              id: item.classification
            }
          },
          delivery_type: {
              data: []
          },
          features: {
              data: []
          },
          product_pictures: {
              data: []
          },
          service_pictures: {
              data: []
          },
          meal_addons: {
            data: []
          },
          meal_pictures: {
            data: []
          },
          vehicle_pictures: {
            data: []
          },
          related: {
              data: []
          }
        }
      }
    };
    const dataToSend = {...data};
    delete dataToSend.stand;
    delete dataToSend.itemClassificacionType;
    delete dataToSend.classification;
    delete dataToSend.itemType;
    let url = 'products/';
    if ( item.itemType === 'Service' ) {
      url = 'services/';
    }
    if ( item.itemType === 'Meal' ) {
      url = 'meals/';
    }
    if ( item.itemType === 'Vehicle' ) {
      url = 'vehicles/';
      data.data.relationships.model = {
        data: {
          type: 'VehicleModel',
          id: 1
        }
      };
    }
    if ( item.itemType === 'RealEstate' ) {
      url = 'real-estates/';
    }
    APIPost(url, dataToSend)
      .then((response: any) => {
        res(response.data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default AddBuyableItem;
