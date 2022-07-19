import React, {
  useEffect, useState
} from 'react';
import {
  useNavigate,
  useParams
} from 'react-router';
import GenericItemDetail from 'src/components/generic-item-detail';
import fetchData from 'src/modules/utils/fetch-data';

const StandRealEstateDetail = (): React.ReactElement => {
  const navigate = useNavigate();
  const params: any = useParams();
  const [item, setItem]: any = useState({});

  useEffect(() => {
    fetchData(`real-estates?filter[slug]=${params.realEstateId}&include=classification,real_estate_pictures,features`)
    .then((response: any) => {
      if ( !response.data.length ) {
        console.log('Error de servicio');
      } else {
        const serviceData = response.data[0];
        if (!serviceData) return navigate('/');
        setItem(serviceData);
      }
    })
    .catch((error: any) => {
      console.log('Error de cargado de api', error);
    });
  }, [fetchData]);

  return (
    <>
      {
        item && item.id ?
          <GenericItemDetail item={item}/> : null
      }
    </>
  );
};
 export default StandRealEstateDetail;
