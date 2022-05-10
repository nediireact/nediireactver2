import React, {
  useEffect,
  useState
} from 'react';
import {
  useNavigate,
  useParams
} from 'react-router-dom';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  LoadingIndicator
} from 'rrmc';
import fetchData from 'src/modules/utils/fetch-data';
import StandHeader from 'src/modules/stand-header/stand-header';
import StandRouteNav from 'src/modules/stand-route-nav/stand-route-nav';
import setStandData from 'src/redux/actions/set-stand-data';
import LoadUserFavoriteStands from 'src/modules/user-favorites/load-user-favorite-stands';
import LoadUserFavoriteItems from 'src/modules/user-favorites/load-user-favorite-items';

const StandDataLoader = (props: any): React.ReactElement => {
  const stand = useSelector((state: any) => state.stand);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    if ( stand && stand && stand[params.standId] && stand[params.standId].attributes ) {
      setMenu(stand[params.standId]);
    }
    const commonFields = 'name,slug,price,discount,final_price,img_picture,short_description';
    let url = `stands?filter[slug]=${params.standId}`;
    url += '&include=owner,phones,pictures,expo,group,stand_news,';
    url += 'stand_booking_questions,stand_booking_questions.options,';
    url += 'survey_questions,city,city.state,city.state.country,';
    url += 'highlighted_products,highlighted_services,highlighted_meals,';
    url += 'highlighted_real_estates,highlighted_vehicles,';
    url += 'highlighted_vehicles.model,highlighted_vehicles.model.make';
    url += `&fields[Product]=${commonFields}`;
    url += `&fields[Service]=${commonFields}`;
    url += `&fields[Meal]=${commonFields}`;
    url += `&fields[RealEstate]=${commonFields}`;
    url += `&fields[Vehicle]=${commonFields},year,model`;
    url += '&fields[VehicleModel]=name,make';
    url += '&fields[VehicleMake]=name';
    url += '&fields[City]=name,state';
    url += '&fields[State]=name,country';
    url += '&fields[Country]=name';

    fetchData(url)
      .then((response: any) => {
        setIsLoading(false);
        if ( !response.data.length ) {
          return navigate('/');
        }
        const standData = response.data[0];
        setMenu(standData);
        dispatch(setStandData(standData));
      })
      .catch((error) => {
        setIsLoading(false);
        console.log('Hubo un error', error);
        return navigate('/');
      });
  }, [fetchData]);

  return (
    <>
    <LoadingIndicator isLoading={isLoading} />
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
