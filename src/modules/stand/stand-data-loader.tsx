import React, {
  useEffect,
  useState
} from 'react';
import {
  useHistory,
  useParams
} from 'react-router-dom';
import fetchData from 'src/modules/utils/fetch-data';
import standData from 'src/modules/stand/stand-data';
import StandHeader from 'src/modules/stand-header/stand-header';
import StandRouteNav from 'src/modules/stand-route-nav/stand-route-nav';

const StandDataLoader = (props: any): React.ReactElement => {
  const [stand, setStand] = useState(standData);
  const history = useHistory();
  const params: any = useParams();

  useEffect(() => {
    fetchData(`stands?filter[slug]=${params.standId}&include=owner,phones,ratings,pictures,expo,group,stand_news,stand_booking_questions,stand_booking_questions.options,survey_questions,city,city.state,city.state.country`)
      .then((response: any) => {
        if (response.data.length === 0) {
          return history.replace('/');
        }
        const standData = response.data[0];
        console.log('standData', standData);
        const menu: any[] = [];
        menu.push({
          to: `/empresa/${standData.attributes.slug}`,
          text: 'Inicio',
          rightLine: true
        });
        if ( standData.meta.meals ) {
          menu.push({
            to: `/empresa/${standData.attributes.slug}/menu`,
            text: 'Menu',
            icon: 'local_pizza'
          });
        }
        if ( standData.meta.products ) {
          menu.push({
            to: `/empresa/${standData.attributes.slug}/productos`,
            text: 'Productos',
            icon: 'watch'
          });
        }
        if ( standData.meta.services ) {
          menu.push({
            to: `/empresa/${standData.attributes.slug}/servicios`,
            text: 'Servicios',
            icon: 'business'
          });
        }
        if ( standData.meta.real_estate ) {
          menu.push({
            to: `/empresa/${standData.attributes.slug}/inmuebles`,
            text: 'Inmuebles',
            icon: 'home'
          });
        }
        if ( standData.meta.vehicles ) {
          menu.push({
            to: `/empresa/${standData.attributes.slug}/vehiculos`,
            text: 'Vehiculos',
            icon: 'directions_car'
          });
        }
        props.setSectionMenu(menu);
        setStand(standData);
        props.setStand(standData);
      })
      .catch((error) => {
        console.log('Hubo un error', error);
        return history.replace('/');
      });
  }, [fetchData]);

  return (
    <>
    {
      stand.attributes ? <>
        <StandHeader
          stand={stand.attributes}
          size='medium'
          ratings={stand.relationships.ratings.data} />
        <StandRouteNav />
      </> : null
    }
    </>
  );
};

export default StandDataLoader;