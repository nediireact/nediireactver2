import { APIPost } from 'src/api/communicator';
import SystemValues from 'src/constants/SystemValues';

export const AddBuyableItem = (item: any): Promise<any> => {
  return new Promise((res, rej) => {
    const user = SystemValues.getInstance().user;
    if ( !user.id ) return res(new Error('No user'));
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
    APIPost('products/', dataToSend)
      .then((response: any) => {
        res(response.data);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default AddBuyableItem;
