import React, {
  useEffect,
  useState
} from 'react';
import {
  useNavigate,
  useParams } from 'react-router';
import fetchData from 'src/modules/utils/fetch-data';
import GenericItemDetail from 'src/modules/generic-item-detail/generic-item-detail';

const StandMealsDetail = (): React.ReactElement => {
  const navigate = useNavigate();
  const params: any = useParams();
  const [meal, setMeal]: any = useState({});

  useEffect(() => {
    fetchData(`meals?filter[slug]=${params.mealId}&include=meal_pictures,meal_addons,classification,stand`)
    .then((response: any) => {
      if ( !response.data.length ) {
        console.log('Error de platillo');
      } else {
        const mealsData = response.data[0];
        if (!mealsData) return navigate('/');
        setMeal(mealsData);
      }
    })
    .catch((error) => {
      console.log('Error de cargado de api', error);
    });
  }, [fetchData]);
  return (
    <>
    {
      meal && meal.id ?
        <GenericItemDetail item={meal}/> : null
    }
    </>
  );
};

export default StandMealsDetail;
