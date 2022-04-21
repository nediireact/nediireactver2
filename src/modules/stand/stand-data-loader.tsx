import React, { useEffect } from 'react';
import {
  useNavigate,
  useParams
} from 'react-router-dom';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import fetchData from 'src/modules/utils/fetch-data';
import StandHeader from 'src/modules/stand-header/stand-header';
import StandRouteNav from 'src/modules/stand-route-nav/stand-route-nav';
import setStandData from 'src/redux/actions/set-stand-data';
import LoadUserFavoriteStands from 'src/modules/user-favorites/load-user-favorite-stands';
import LoadUserFavoriteItems from 'src/modules/user-favorites/load-user-favorite-items';

const StandDataLoader = (props: any): React.ReactElement => {
  const stand = useSelector((state: any) => state.stand);
  const navigate = useNavigate();
  const params: any = useParams();
  const dispatch = useDispatch();

  const setMenu = (stand: any) => {
    const menu: any[] = [];
    menu.push({
      to: '/',
      text: 'Inicio',
      rightLine: true
    });
    // menu.push({
    //   to: '/expos',
    //   text: 'Expos',
    //   rightLine: true
    // });
    // menu.push({
    //   to: `/empresa/${stand.attributes.slug}`,
    //   text: stand.attributes.name,
    //   rightLine: true
    // });
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
    if ( stand && stand && stand[params.standId] && stand[params.standId].attributes ) {
      setMenu(stand[params.standId]);
    }
    const commonFields = 'name,slug,price,discount,final_price,img_picture,short_description';
    let urlStandDataLoader = `stands?filter[slug]=${params.standId}`;
    urlStandDataLoader += '&include=owner,phones,pictures,expo,group,stand_news,';
    urlStandDataLoader += 'stand-booking-questions,stand-booking-questions.options,';
    urlStandDataLoader += 'survey_questions,';
    urlStandDataLoader += 'city,city.state,city.state.country,';
    urlStandDataLoader += 'highlighted_products,highlighted_services,highlighted_meals,highlighted_real_estates,highlighted_vehicles,';
    urlStandDataLoader += 'highlighted_vehicles.model,highlighted_vehicles.model.make';
    urlStandDataLoader += `&fields[Product]=${commonFields}`;
    urlStandDataLoader += `&fields[Service]=${commonFields},warranty_days`;
    urlStandDataLoader += `&fields[Meal]=${commonFields},is_breakfast,is_meal,is_dinner`;
    urlStandDataLoader += `&fields[Vehicle]=${commonFields},year,model`;
    urlStandDataLoader += '&fields[VehicleModel]=name,make';
    urlStandDataLoader += '&fields[VehicleMake]=name';
    urlStandDataLoader += `&fields[RealEstate]=${commonFields},state,area,num_of_bedrooms,num_of_bathrooms,num_of_parking_spots`;
    urlStandDataLoader += '&fields[City]=name,state';
    urlStandDataLoader += '&fields[State]=name,country';
    urlStandDataLoader += '&fields[Country]=name,code,phone_code,img_flag';
    console.log('Url optimizada', urlStandDataLoader);

    fetchData(urlStandDataLoader)
      .then((response: any) => {
        if ( !response.data.length ) {
          return navigate('/');
        }
        const standData = response.data[0];
        setMenu(standData);
        dispatch(setStandData(standData));
        console.log('StandData:', standData);
      })
      .catch((error) => {
        console.log('Hubo un error', error);
        return navigate('/');
      });
  }, [fetchData]);

  return (
    <>
    {
      stand && stand && stand[params.standId] && stand[params.standId].attributes ?
      <>
        <StandHeader
          stand={stand[params.standId]}
          size='medium' />
        <StandRouteNav />
        <LoadUserFavoriteStands />
        <LoadUserFavoriteItems />
      </> : null
    }
    </>
  );
};

export default StandDataLoader;
