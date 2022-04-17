import { APIPost } from 'src/api/communicator';
import store from 'src/redux/store';
import GetUserAddress from './get-user-address';
import CheckState from './check-state';
import CheckCity from './check-city';
import AddStandPhone from './add-stand-phone';
import UpdateStand from './update-stand';

export const AddStand = (stand: any): Promise<any> => {
  return new Promise((res, rej) => {
    const user = store && store.getState().user &&
      store.getState().user.user &&
      store.getState().user.user.id ?
      store.getState().user.user : null;
    if ( !user ) return rej(new Error('no user'));
    const data: any = {
      data: {
        type: 'Stand',
        attributes: stand,
        relationships: {
          owner: {
            data: {
              type: 'User',
              id: user.id
            }
          },
          city: {
            data: {
              type: 'City',
              id: 0
            }
          },
          plan: {
            data: {
              type: 'NediiPlans',
              id: stand.plan
            }
          },
          group: {
            data: {
              type: 'Group',
              id: stand.group
            }
          },
          expo: {
            data: {
              type: 'Expo',
              id: stand.expo
            }
          },
          highlighted_meals: {
            data: []
          },
          highlighted_products: {
            data: []
          },
          highlighted_real_estates: {
            data: []
          },
          highlighted_services: {
            data: []
          },
          highlighted_vehicles: {
            data: []
          },
          panorama: {
            data: []
          },
          phones: {
            data: []
          },
          pictures: {
            data: []
          },
          promotions: {
            data: []
          },
          ratings: {
            data: []
          },
          stand_booking_questions: {
            data: []
          },
          stand_news: {
            data: []
          },
          survey_questions: {
            data: []
          },
          video_links: {
            data: []
          }
        }
      }
    };
    let newStandData: any;
    CheckState(stand.state)
      .then((response: any) => {
        return CheckCity(stand.city, response.id);
      })
      .then((response: any) => {
        data.data.relationships.city.data.id = response.id;
        APIPost('stands/', data)
          .then((response: any) => {
            newStandData = response.data;
            return GetUserAddress();
          })
          .then(() => {
            const promises = [];
            if ( stand.phone1 ) {
              promises.push(AddStandPhone(stand.phone1, newStandData.id));
            }
            if ( stand.phone2 ) {
              promises.push(AddStandPhone(stand.phone2, newStandData.id));
            }
            return Promise.all(promises);
          })
          .then((response: any) => {
            const phones: Array<any> = [];
            response.forEach((i: any) => {
              phones.push({
                type: i.type,
                id: i.id
              });
            });
            return UpdateStand({
              id: newStandData.id,
              relationships: {
                phones: {
                  data: phones
                }
              }
            });
          })
          .then((response: any) => {
            console.log('UpdateStand:', response);
            res(newStandData);
          })
          .catch((error: any) => {
            rej(error);
          });
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default AddStand;
