import React, { useEffect } from 'react';
import {
  useHistory,
  useParams
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import fetchData from 'src/modules/utils/fetch-data';
import StandHeader from 'src/modules/stand-header/stand-header';
import StandRouteNav from 'src/modules/stand-route-nav/stand-route-nav';
import setStandData from 'src/redux/actions/set-stand-data';

const StandDataLoader = (props: any): React.ReactElement => {
  const stand = useSelector((state: any) => state.stand);
  const history = useHistory();
  const params: any = useParams();

  const setMenu = (stand: any) => {
    const menu: any[] = [];
    menu.push({
      to: `/empresa/${stand.attributes.slug}`,
      text: 'Inicio',
      rightLine: true
    });
    if ( stand.meta.meals ) {
      menu.push({
        to: `/empresa/${stand.attributes.slug}/menu`,
        text: 'Menu',
        icon: 'local_pizza'
      });
    }
    if ( stand.meta.products ) {
      menu.push({
        to: `/empresa/${stand.attributes.slug}/productos`,
        text: 'Productos',
        icon: 'watch'
      });
    }
    if ( stand.meta.services ) {
      menu.push({
        to: `/empresa/${stand.attributes.slug}/servicios`,
        text: 'Servicios',
        icon: 'business'
      });
    }
    if ( stand.meta.real_estate ) {
      menu.push({
        to: `/empresa/${stand.attributes.slug}/inmuebles`,
        text: 'Inmuebles',
        icon: 'home'
      });
    }
    if ( stand.meta.vehicles ) {
      menu.push({
        to: `/empresa/${stand.attributes.slug}/vehiculos`,
        text: 'Vehiculos',
        icon: 'directions_car'
      });
    }
    props.setSectionMenu(menu);
  };

  useEffect(() => {
    fetchData(`stands?filter[slug]=${params.standId}&include=owner,phones,ratings,pictures,expo,group,stand_news,stand_booking_questions,stand_booking_questions.options,survey_questions,city,city.state,city.state.country`)
      .then((response: any) => {
        console.log('>>>>>> response', response.data);
        if (response.data.length === 0) {
          return history.replace('/');
        }
        const standData = response.data[0];
        setMenu(standData);
        props.setStand(setStandData(standData));
      })
      .catch((error) => {
        console.log('Hubo un error', error);
        return history.replace('/');
      });
    if ( stand && stand.attributes ) setMenu(stand);
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
