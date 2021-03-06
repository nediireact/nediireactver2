import React, {
  useEffect, useState
} from 'react';
import {
  useNavigate,
  useParams
} from 'react-router';
import GenericItemDetail from 'src/modules/generic-item-detail/generic-item-detail';
import fetchData from 'src/modules/utils/fetch-data';

const StandVehicleDetail = (): React.ReactElement => {
  const navigate = useNavigate();
  const params: any = useParams();
  const [vehicle, setVehicle]: any = useState({});

  useEffect(() => {
    fetchData(`vehicles?filter[slug]=${params.vehicleId}&include=classification,features,stand,features,vehicle_pictures,model,model.make,related`)
    .then((response: any) => {
      if ( !response.data.length ) {
        console.log('Error de servicio');
      } else {
        const vehicleData = response.data[0];
        if (!vehicleData) return navigate('/');
        setVehicle(vehicleData);
      }
    })
    .catch((error) => {
      console.log('Error de cargado de api', error);
    });
  }, [fetchData]);

  return (
    <>
      {
        vehicle && vehicle.id ?
          <GenericItemDetail item={vehicle}/> : null
      }
    </>
  );
};
 export default StandVehicleDetail;
