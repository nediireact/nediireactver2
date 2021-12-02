import React from 'react';
import StandPictures from 'src/modules/stand-detail/stand-pictures';
import StandMealsAddons from 'src/modules/stand-detail/meals/stand-meals-addons';
import 'src/modules/stand-detail/meals/stand-detail-product.scss';
import SubTitle from 'src/modules/sub-title/sub-title';
import CommonLargeText from 'src/modules/stand-detail/stand-common-large-text';
import TextWithIcon from 'src/modules/text-with-icon/text-with-icon';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';

const TextWhitIconInfo = (props: any): React.ReactElement => {
  return (
    <div className='StandDetailProduct__textIcon'>
      {props.apiInfo ?
        <div>{props.apiInfo}{props.text}
          <i className={`material-icons ${props.colorIcon} left`}>{props.icon}</i>
        </div> : null}
    </div>
  );
};

const StandDetailProduct = (props: any): React.ReactElement => {
  return (
    <div>
      <div className='container row'>
        <div className='col s12 m8'>
          <div className='hide-on-med-and-up'>
              <div>
                <HorizontalSpace size='small'/>
              </div>
              <div className='center-align grey-text'>Ventas: {props.selled}</div>
              <div className='center-align cyan-text'>
                <span className='grey-text text-darken-4'>Categoría:  </span>{props.classification}
              </div>
              <div className='StandDetailProduct__title center-align'>{props.title}</div>
            </div>
          <StandPictures images={props.images}/>
          <div className='Description-movil hide-on-small-only'>
            <CommonLargeText text={props.description}/>
          </div>
        </div>
        <div className='StandDetailProduct col s12 m4'>
          <div className='StandDetailProduct__card'>
            <div className='hide-on-small-only'>
              <div className='center-align grey-text'>Ventas: {props.selled}</div>
              <div className='center-align cyan-text'>
                <span className='grey-text text-darken-4'>Categoría:  </span>{props.classification}
              </div>
              <div className='StandDetailProduct__title center-align'>{props.title}</div>
            </div>
            {props.discount > 0 ? <div className='StandDetailProduct__discount grey-text'>${props.price }</div> : null}
            <span className='StandDetailProduct__price'>${props.discount > 0 ? props.finaPrice : props.price}</span>
            {props.discount > 0 ? <span className='StandDetailProduct__discountOff green-text'>{props.discount}%Off</span> : null}
            <SubTitle text={props.subtitle1}/>
            <TextWhitIconInfo
              apiInfo={props.breakfast}
              text={props.desayuno}
              colorIcon={props.colorIcon1}
              icon={props.icon1} />
            <TextWhitIconInfo
              apiInfo={props.meal}
              text={props.comida}
              colorIcon={props.colorIcon2}
              icon={props.icon2} />
            <TextWhitIconInfo
              apiInfo={props.dinner}
              text={props.cena}
              colorIcon={props.colorIcon3}
              icon={props.icon3} />
            <SubTitle text={props.subtitle2}/>
            <StandMealsAddons mealsAddons={props.mealsAddons}/>
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
      <CommonLargeText text={props.description}/>
      <HorizontalSpace size='small'/>
    </div>
  </div>
  );
};

export default StandDetailProduct;
