import React, {
  useEffect, useState
} from 'react';
import {
  useNavigate,
  useParams
} from 'react-router';
import GenericItemDetail from 'src/components/generic-item-detail';
import fetchData from 'src/modules/utils/fetch-data';

const StandServicesDetail = (): React.ReactElement => {
  const navigate = useNavigate();
  const params: any = useParams();
  const [service, setService]: any = useState({});

  useEffect(() => {
    fetchData(`services?filter[slug]=${params.serviceId}&include=classification,features,stand,service_pictures,related`)
    .then((response: any) => {
      if ( !response.data.length ) {
        console.log('Error de servicio');
      } else {
        const serviceData = response.data[0];
        if (!serviceData) return navigate('/');
        setService(serviceData);
      }
    })
    .catch((error: any) => {
      console.log('Error de cargado de api', error);
    });
  }, [fetchData]);

  return (
    <>
      {
        service && service.id ?
          <GenericItemDetail item={service}/> : null
      }
    </>
  );
};
 export default StandServicesDetail;
