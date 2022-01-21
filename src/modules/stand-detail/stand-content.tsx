import React, {
  useRef,
  useEffect
} from 'react';
import 'src/modules/stand-detail/stand-detail.scss';
import CommonLargeText from 'src/modules/stand-detail/stand-common-large-text';
import StandPhones from 'src/modules/stand-detail/stand-phones';
import StandPictures from 'src/modules/stand-detail/stand-pictures';
import StandOwnerInfo from 'src/modules/stand-detail/stand-owner-info';
import ExpoItem from 'src/modules/expo-grid/expo-item';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import GroupItem from 'src/modules/group-grid/group-item';
import * as M from 'materialize-css';
import QRCodeComponent from 'src/modules/stand-detail/stand-qr';
import StandGridNews from 'src/modules/stand-detail/news/stand-grid-news';
import StandMeals from 'src/modules/stand-detail/meals/stand-meals-grid';
import StandBookingQuestions from 'src/modules/stand-detail/booking-questions/stand-booking-questions';
import StandSurveyQuestion from 'src/modules/stand-detail/stand-components/stand-survey-questions';
import StandProducts from 'src/modules/products/products';

const StandContent = (props: any): React.ReactElement => {
  const tabsComponentRef: any = useRef(null);
  const news = props.stand.relationships.stand_news;
  const numProducts = props.stand.meta.products;
  const numMeals = props.stand.meta.meals;

  useEffect(() => {
    M.Tabs.init(tabsComponentRef, {
      swipeable: true
    });
  }, [M]);

  return (
    <div className='Stand'>
      <div className='container'>
        <ul className='tabs Stand__tabs' ref={tabsComponentRef}>
          <li className='tab col s3'><a href='#test1' className='active'>Inicio</a></li>
          { numProducts ? <li className='tab col s3'><a href='#products'>Productos ({numProducts})</a></li> : null }
          {/* { numServices ? <li className='tab col s3'><a href='#test3'>Servicios</a></li> : null } */}
          {/* <li className='tab col s3'><a href='#test4'>Autos</a></li> */}
          { numMeals ? <li className='tab col s3'><a href='#meals'>Menu ({numMeals})</a></li> : null }
          { news.length ? <li className='tab col s3'><a href='#news'>Noticias</a></li> : null }
          <li className='tab col s3'><a href='#test7'>Reservaciones</a></li>
          <li className='tab col s3'><a href='#test8'>Encuestas</a></li>
        </ul>
        <div id='test1' className='col s12 row'>
          <div className='col s12 m8 Stand__main-container'>
            <CommonLargeText text={props.stand.attributes.description} />
            <StandPictures images={props.stand.relationships.pictures.data} />
            <QRCodeComponent title={`QR code de ${props.stand.attributes.name}`}/>
          </div>
          <div className='col s12 m4 Stand__aside'>
            <StandPhones
              title='Contacto'
              phones={props.stand.relationships.phones} />
            <HorizontalSpace size='small' />
            {
              props.stand.relationships.owner.data.attributes ?
                <StandOwnerInfo owner={props.stand.relationships.owner.data.attributes} /> : null
            }
            <HorizontalSpace size='small' />
            <ExpoItem item={props.stand.relationships.expo.data}/>
            <GroupItem item={props.stand.relationships.group.data}/>
          </div>
        </div>
        <div id='products' className='col s12 row'>
        {
          props.stand && props.stand.id ?
            <StandProducts
              standId={props.stand.id}
              standSlug={props.stand.attributes.slug} /> : null
        }
        </div>
        {/* <div id='test3' className='col s12'>Servicios</div>
        <div id='test4' className='col s12'>Autos</div> */}
        <div id='meals' className='col s12 row'>
        {
          props.stand && props.stand.id ?
            <StandMeals
              standId={props.stand.id}
              standSlug={props.stand.attributes.slug} /> : null
        }
        </div>
        <div id='news' className='col s12'>
          <StandGridNews
            news={news}
            stand_slug={props.stand.attributes.slug}
            size='col s12 m4' />
        </div>
        <div id='test7' className='col s12'>
          <StandBookingQuestions questions={props.stand.relationships.stand_booking_questions}/>
        </div>
        <div id='test8' className='col s12'>
          <StandSurveyQuestion survey={props.stand.relationships.survey_questions}/>
        </div>
      </div>
    </div>
  );
};

export default StandContent;

