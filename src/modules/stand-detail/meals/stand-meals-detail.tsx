import React, {
  useEffect,
  useState } from 'react';
import {
  useNavigate,
  useParams } from 'react-router';
import fetchData from 'src/modules/utils/fetch-data';
import StandParallaxHeaderImage from 'src/modules/stand-detail/stand-parallax-header-image';
import StandDetailProduct from 'src/modules/stand-detail/meals/stand-detail-product';

const mealsData = {
  attributes: {
    name: '',
    price: '',
    discount: '',
    final_price: '',
    times_selled: '',
    is_breakfast: '',
    is_meal: '',
    is_dinner: '',
    description: ''
  },
  relationships: {
    meal_pictures: {
      data: []
    },
    stand: {
      data: {
        attributes: {
          img_cover: ''
        }
      }
    },
    classification: {
      data: {
        attributes: {
          name: ''
        }
      }
    },
    meal_addons: {
      data: [{
        id: 0,
        attributes: {
          name: '',
          price: ''
        }
      }]
    }
  }
};

const StandMealsDetail = (): React.ReactElement => {
  const navigate = useNavigate();
  const params: any = useParams();
  const [meals, setmeals]: any = useState(mealsData);

  useEffect(() => {
    fetchData(`meals?filter[slug]=${params.mealId}&include=meal_pictures,meal_addons,classification,stand`)
    .then((response: any) => {
      console.log(response);
      if ( response.data.length === 0 ) {
        console.log('Error de platillo');
      } else {
        const mealsData = response.data[0];
        if (!mealsData) return navigate('/');
        setmeals(mealsData);
      }
    })
    .catch((error) => {
      console.log('Error de cargado de api', error);
    });
  }, [fetchData]);
  return (
    <div>
      <StandParallaxHeaderImage
        image={meals.relationships.stand.data.attributes.img_cover}
        size='medium'
        title={meals.relationships.stand.data.attributes.name}
        logo={meals.relationships.stand.data.attributes.img_logo}
        restaurant={meals.relationships.stand.data.attributes.restaurant}
        slogan={meals.relationships.stand.data.attributes.slogan}/>
      <StandDetailProduct
        images={meals.relationships.meal_pictures.data}
        selled={meals.attributes.times_selled}
        classification={meals.relationships.classification.data.attributes.name}
        name={meals.attributes.name}
        discount={meals.attributes.discount}
        finaPrice={meals.attributes.final_price}
        price={meals.attributes.price}
        subtitle1='Tiempo de platillo'
        desayuno='Desayuno'
        breakfast={meals.attributes.is_breakfast}
        icon1='brightness_7'
        colorIcon1='orange-text'
        comida='Comida'
        meal={meals.attributes.is_meal}
        icon2='brightness_6'
        colorIcon2='cyan-text'
        cena='Cena'
        dinner={meals.attributes.is_dinner}
        icon3='brightness_2'
        colorIcon3='indigo-text'
        subtitle2='Adicionales'
        mealsAddons={meals.relationships.meal_addons}
        description={meals.attributes.description} />
    </div>
  );
};

export default StandMealsDetail;
