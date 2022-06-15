import React, {
  useEffect,
  useState
} from 'react';
import {
  useNavigate,
  useParams
} from 'react-router-dom';
import {
  LoadingIndicator
} from 'rrmc';
import SystemValues from 'src/constants/SystemValues';
import APISDK from 'src/api/api-sdk';
import StandHeader from 'src/components/stand-header';
import StandRouteNav from 'src/components/stand-route-nav';

const StandDataLoader = (props: any): React.ReactElement => {
  const stand = SystemValues.getInstance().system.standsById;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const params: any = useParams();

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
    APISDK.GetFullStandBySlug(params.standId)
      .then((response: any) => {
        setIsLoading(false);
        setMenu(response);
      })
      .catch(() => {
        setIsLoading(false);
        return navigate('/');
      });
    APISDK.GetFavoriteItems();
    APISDK.GetFavoriteStands();
  }, [APISDK]);

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
      </> : null
    }
    </>
  );
};

export default StandDataLoader;
