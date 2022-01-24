import React, { useEffect, useState } from 'react';
import {
  useHistory,
  useParams } from 'react-router';
import GenericItemDetail from 'src/modules/generic-item-detail/generic-item-detail';
import fetchData from 'src/modules/utils/fetch-data';

const StandVehicleDetail = (): React.ReactElement => {
  const history = useHistory();
  const params: any = useParams();
  const [vehicle, setVehicle]: any = useState({});

  useEffect(() => {
    fetchData(`vehicles?filter[slug]=${params.vehicleId}&include=classification,features,stand,features,vehicle_pictures,model,related`)
    .then((response: any) => {
      console.log(response);
      if (response.data.length === 0) {
        console.log('Error de servicio');
      } else {
        const vehicleData = response.data[0];
        if (!vehicleData) return history.replace('/');
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
