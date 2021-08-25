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

const StandContent = (props: any): React.ReactElement => {
  const tabsComponentRef: any = useRef(null);
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
          <li className='tab col s3'><a href='#test2'>Productos</a></li>
          <li className='tab col s3'><a href='#test3'>Servicios</a></li>
          <li className='tab col s3'><a href='#test4'>Autos</a></li>
          <li className='tab col s3'><a href='#test5'>Comidas</a></li>
          <li className='tab col s3'><a href='#test6'>Noticias</a></li>
          <li className='tab col s3'><a href='#test7'>Reservaciones</a></li>
        </ul>
        <div id='test1' className='col s12 row'>
          <div className='col s12 m8 Stand__main-container'>
            <CommonLargeText text={props.stand.attributes.description} />
            <StandPictures
              backgroundImage={props.stand.attributes.img_cover}
              images={props.stand.relationships.pictures.data} />
            <QRCodeComponent title={`QR code de ${props.stand.attributes.name}`}/>
          </div>
          <div className='col s12 m4 Stand__aside'>
            <StandPhones
              title='Contacto'
              phones={props.stand.relationships.phones} />
            <HorizontalSpace size='small' />
            <StandOwnerInfo owner={props.stand.relationships.owner.data.attributes} />
            <HorizontalSpace size='small' />
            <ExpoItem item={props.stand.relationships.expo.data}/>
            <GroupItem item={props.stand.relationships.group.data}/>
          </div>
        </div>
        <div id='test2' className='col s12'>Productos</div>
        <div id='test3' className='col s12'>Servicios</div>
        <div id='test4' className='col s12'>Autos</div>
        <div id='test5' className='col s12'>Comidas</div>
        <div id='test6' className='col s12'>Noticias</div>
        <div id='test7' className='col s12'>Reservaciones</div>
      </div>
    </div>
  );
};

export default StandContent;

