import React, {
  useEffect,
  useState
} from 'react';
import {
  useHistory,
  useParams } from 'react-router';
import fetchData from 'src/modules/utils/fetch-data';
import mealsData from 'src/modules/stand-meals-detail/meals-data';
import HorizontalSpace from '../horizontal-space/horizontal-space';
import StandPictures from '../stand-detail/stand-pictures';
import CommonLargeText from '../stand-detail/stand-common-large-text';
import TextWhitIconInfo from 'src/modules/text-with-icon/text-with-icon-info';
import TextWithIcon from 'src/modules/text-with-icon/text-with-icon';
import StandMealsAddons from 'src/modules/stand-meals-detail/stand-meals-addons';
import 'src/modules/stand-meals-detail/stand-meals-detail.scss';
import StrongText from 'src/modules/strong-text/strong-text';
import SimpleAttribute from 'src/modules/simple-attribute/simple-attribute';
import Title from 'src/modules/title/title';
import MultipleStyleText from 'src/modules/multiple-style-text/multiple-style-text';
import MultipleStyleTextSpan from 'src/modules/multiple-style-text/multiple-style-text-span';

const StandMealsDetail = (): React.ReactElement => {
  const history = useHistory();
  const params: any = useParams();
  const [meal, setMeal]: any = useState(mealsData);

  useEffect(() => {
    fetchData(`meals?filter[slug]=${params.mealId}&include=meal_pictures,meal_addons,classification,stand`)
    .then((response: any) => {
      console.log(response);
      if ( response.data.length === 0 ) {
        console.log('Error de platillo');
      } else {
        const mealsData = response.data[0];
        if (!mealsData) return history.replace('/');
        setMeal(mealsData);
      }
    })
    .catch((error) => {
      console.log('Error de cargado de api', error);
    });
  }, [fetchData]);
  return (
    <>
      <div className='container row'>
        <div className='col s12 m8'>
          <div className='hide-on-med-and-up'>
              <div>
                <HorizontalSpace size='small'/>
              </div>
              <SimpleAttribute text='Ventas: ' attribute={meal.attributes.times_selled} size='small' color1='grey-text' color2='cyan-text'/>
              <SimpleAttribute text='Categoría: ' attribute={meal.relationships.classification.data.attributes.name} size='small' color1='grey-text' color2='cyan-text'/>
              <Title text={meal.attributes.name} fullWidth={true}/>
            </div>
          <StandPictures images={meal.relationships.meal_pictures.data}/>
          <div className='Description-movil hide-on-small-only'>
            <CommonLargeText text={meal.attributes.description}/>
          </div>
        </div>
        <div className='StandDetailProduct col s12 m4'>
          <div className='StandDetailProduct__card'>
            <div className='hide-on-small-only'>
              <SimpleAttribute text='Ventas: ' attribute={meal.attributes.times_selled} size='small' color1='grey-text' color2='cyan-text' margin='marginTopSmall'/>
              <SimpleAttribute text='Categoría: ' attribute={meal.relationships.classification.data.attributes.name} size='small' color1='grey-text' color2='cyan-text'/>
              <Title text={meal.attributes.name} fullWidth={true}/>
            </div>
            {meal.attributes.discount > 0 ? <MultipleStyleText text={`$${meal.attributes.price}`} style='discount'/> : null}
            <MultipleStyleTextSpan text={`$ ${meal.attributes.discount > 0 ? meal.attributes.final_price : meal.attributes.price}`}style='price'/>
            {meal.attributes.discount > 0 ? <MultipleStyleTextSpan text={`${meal.attributes.discount} %OFF`} style='disconuntoff'/> : null}
            <StrongText text='Tiempo de platillo'/>
            <TextWhitIconInfo
              apiInfo={meal.attributes.is_breakfast}
              text='Desayuno'
              colorIcon='orange-text'
              icon='brightness_7' />
            <TextWhitIconInfo
              apiInfo={meal.attributes.is_meal}
              text='Comida'
              colorIcon='cyan-text'
              icon='brightness_6' />
            <TextWhitIconInfo
              apiInfo={meal.attributes.is_dinner}
              text='Cena'
              colorIcon='indigo-text'
              icon='brightness_2' />
            <StrongText text='Adicionales'/>
            <StandMealsAddons mealsAddons={meal.relationships.meal_addons}/>
            <div className='StandDetailProduct__shop row'>
            <TextWithIcon
              size='col s12 xl6'
              link=''
              color_item='cyan-text'
              icon='add_shopping_cart'
              text_color='grey-text text-darken-4'
              text='Agregar'/>
            <TextWithIcon
              size='col s12 xl6'
              link=''
              color_item='cyan-text'
              icon='credit_card'
              text_color='grey-text text-darken-4'
              text='Comprar'/>
            </div>
          </div>
        </div>
      </div>
      <div className='hide-on-med-and-up container'>
        <CommonLargeText text={meal.attributes.description}/>
        <HorizontalSpace size='small'/>
      </div>
    </>
  );
};

export default StandMealsDetail;
