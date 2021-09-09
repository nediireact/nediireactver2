import React, {
  useEffect,
  useState
} from 'react';
import {
  useHistory,
  useParams
} from 'react-router-dom';
import fetchData from 'src/modules/utils/fetch-data';
import 'src/modules/stand-detail/stand-detail.scss';
import StandParallaxHeaderImage from 'src/modules/stand-detail/stand-parallax-header-image';
import StandContent from 'src/modules/stand-detail/stand-content';

const standData = {
  attributes: {
    name: '',
    slug: '',
    img_cover: '',
    img_logo: '',
    contact_email: '',
    restaurant: '',
    description: '',
    slogan: ''
  },
  relationships: {
    phones: {
      data: [{
        id: 0,
        attributes: {
          phone: ''
        }
      }]
    },
    ratings: {
      data: []
    },
    pictures: {
      data: []
    },
    owner: {
      data: {
        attributes: {
          first_name: '',
          last_name: '',
          profile: {
            img_picture: '',
            owner_address: '',
            owner_email: '',
            owner_office_phone: '',
            owner_phone: '',
            owner_position: '',
            owner_position_description: '',
            owner_whatsapp: ''
          }
        }
      }
    },
    expo: {
      data: {
        attributes: {
          img_picture: '',
          title: '',
          description: '',
          real: ''
        }
      }
    },
    group: {
      data: {
        attributes: {
          img_picture: '',
          title: '',
          description: '',
          real: '',
          email: '',
          slug: '',
          color: ''
        }
      }
    },
    stand_news: {
      data: [{
        id: 0,
        attributes: {
          created: '',
          description: '',
          img_picture: '',
          title: '',
          slug: ''
        }
      }]
    }
  }
};

const StandDetailComponent = (): React.ReactElement => {
  const history = useHistory();
  const params: any = useParams();
  const [stand, setStand] = useState(standData);

  useEffect(() => {
    fetchData(`stands?filter[slug]=${params.standId}&include=owner,phones,ratings,pictures,expo,group,stand_news`)
      .then((response: any) => {
        if (response.data.length === 0) {
          console.log('Error, stand no existe');
        } else {
          const standData = response.data[0];
          if (!standData) return history.replace('/');
          console.log('standData', standData);
          setStand(standData);
        }
      })
      .catch((error) => {
        console.log('Hubo un error', error);
      });
  }, [fetchData]);

  return (
    <div>
      <StandParallaxHeaderImage
        image={stand.attributes.img_cover}
        size='medium'
        title={stand.attributes.name}
        logo={stand.attributes.img_logo}
        restaurant={stand.attributes.restaurant}
        slogan={stand.attributes.slogan}
        ratings={stand.relationships.ratings.data} />
      <StandContent stand={stand}/>
    </div>
  );
};

export default StandDetailComponent;
