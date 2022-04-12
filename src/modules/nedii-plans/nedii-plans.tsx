import React, {
  useEffect,
  useState
} from 'react';
import { useSelector } from 'react-redux';
import './nedii-plans.scss';
import {
  StrongText,
  TextWithIconInfo,
  GetMoneyFormat,
  HorizontalSpace
} from 'rrmc';
import APISDK from 'src/api/api-sdk/api-sdk';
import { NediiPlanExposure } from 'src/modules/utils/nedii-plans';

const NediiPlanBillableItem = (props: any): React.ReactElement => {
  const item = props.item;

  return (
    <div className='col s12 m6 xl4 NediiPlan__item'>
      <div className='GenericCard'>
        <div className='NediiPlan__item-header-wrapper'>
          <StrongText
            color='#00acc1'
            fullWidth={true}
            text={item.attributes.name} />
          {
            item.attributes.unlimited_items ?
              <TextWithIconInfo colorIcon='cyan-text' icon='check'
                text='Anuncios ilimitados' /> :
              item.attributes.number_of_items ?
              <TextWithIconInfo colorIcon='cyan-text' icon='check'
                text={`${item.attributes.number_of_items} anuncios`} /> : null
          }
          {
            item.attributes.stand_enabled ?
              <TextWithIconInfo colorIcon='cyan-text' icon='check'
                text='Micrositio' /> : null
          }
          {
            item.attributes.digital_card ?
              <TextWithIconInfo colorIcon='cyan-text' icon='check'
                text='Tarjeta digital' /> : null
          }
          {
            item.attributes.advertising_days ?
              <TextWithIconInfo colorIcon='cyan-text' icon='check'
                text={`${item.attributes.advertising_days} dias de publicidad`} /> : null
          }
          {
            item.attributes.exposure ?
              <TextWithIconInfo colorIcon='cyan-text' icon='check'
                text={`Exposicion ${NediiPlanExposure(item.attributes.exposure)}`} /> : null
          }
        </div>
        <div className='NediiPlan__item-flex-filler'></div>
        <div className='NediiPlan__item-footer-wrapper'>
          <span className='NediiPlan__item-price'>
            MXN {GetMoneyFormat(item.attributes.price)} {item.attributes.billed_monthly ? 'mensuales' : 'anuales'}
          </span>
          <div className='NediiPlan__item-button'>
            <a className='waves-effect waves-light btn cyan'>Obtener</a>
          </div>
        </div>
      </div>
    </div>
  );
};

const NediiPlanFreeItem = (props: any): React.ReactElement => {
  const system = useSelector((state: any) => state.system);
  const prefix = system.platform.prefix;
  const headerPictureURL = `${prefix}'/assets/circle.png'`;
  const item = props.item;

  return (
    <div className='NediiPlan__free-item'
      style={{
        backgroundImage: `url(${headerPictureURL})`
      }}>
      <span className='NediiPlan__free-item-name'>
        {item.attributes.name}
      </span>
      <span className='NediiPlan__free-item-number-of-items'>
        Publica hasta {item.attributes.number_of_items} anuncios
      </span>
      <div className='NediiPlan__free-item-button'>
        <a className='waves-effect waves-light btn cyan'>Obtener</a>
      </div>
    </div>
  );
};

const NediiPlans = (): React.ReactElement => {
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    APISDK.GetNediiPlans()
      .then((data: any) => {
        setPlans(data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [APISDK]);

  return (
    <div className='NediiPlan'>
    <span className='NediiPlan__plan-types'>Planes gratis!</span>
      <HorizontalSpace size='x-small' />
      <div className='NediiPlan__free-items-wrapper'>
      {
        plans.map((i: any, index: number) => {
          if ( i && i.id && i.attributes.price === '0.00' ) {
            return <NediiPlanFreeItem item={i} key={index} />;
          }
        })
      }
      </div>
      <HorizontalSpace size='small' />
      <span className='NediiPlan__plan-types'>Planes premium!</span>
      <HorizontalSpace size='x-small' />
      <div className='row'>
      {
        plans.map((i: any, index: number) => {
          if ( i && i.id && i.attributes.price !== '0.00' ) {
            return <NediiPlanBillableItem item={i} key={index} />;
          }
        })
      }
      </div>
    </div>
  );
};

export default NediiPlans;
