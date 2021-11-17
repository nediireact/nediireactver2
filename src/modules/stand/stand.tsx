import React, {
  useEffect,
  useState
} from 'react';
import {
  useHistory,
  useParams
} from 'react-router-dom';
import fetchData from 'src/modules/utils/fetch-data';
// import 'src/modules/stand-detail/stand-detail.scss';
import StandHeader from 'src/modules/stand-header/stand-header';
import CommonLargeText from 'src/modules/stand-detail/stand-common-large-text';
import standData from 'src/modules/stand/stand-data';

import StandPictures from 'src/modules/stand-detail/stand-pictures';
import QRCodeComponent from 'src/modules/stand-detail/stand-qr';

import StandPhones from 'src/modules/stand-detail/stand-phones';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import StandOwnerInfo from 'src/modules/stand-owner-info/stand-owner-info';
import ExpoItem from 'src/modules/expo-grid/expo-item';
import GroupItem from 'src/modules/group-grid/group-item';

const StandComponent = (props: any): React.ReactElement => {
  const history = useHistory();
  const params: any = useParams();
  const [stand, setStand] = useState(standData);

  useEffect(() => {
    fetchData(`stands?filter[slug]=${params.standId}&include=owner,phones,ratings,pictures,expo,group,stand_news,stand_booking_questions,stand_booking_questions.options,survey_questions`)
      .then((response: any) => {
        if (response.data.length === 0) {
          return history.replace('/');
        }
        const standData = response.data[0];
        console.log('standData', standData);
        const menu: any[] = [];
        if ( standData.meta.meals ) {
          menu.push({
            to: `/stand/${standData.attributes.slug}/platillos`,
            text: 'Platillos'
          });
        }
        if ( standData.meta.products ) {
          menu.push({
            to: `/stand/${standData.attributes.slug}/productos`,
            text: 'Productos'
          });
        }
        props.setSectionMenu(menu);
        setStand(standData);
      })
      .catch((error) => {
        console.log('Hubo un error', error);
        return history.replace('/');
      });
  }, [fetchData]);

  return (
    <div>
      <StandHeader
        stand={stand.attributes}
        size='medium'
        ratings={stand.relationships.ratings.data} />
      <div className='Stand container row'>
        <HorizontalSpace size='small' />
        <div className='col s12 m8'>
          <CommonLargeText text={stand.attributes.description} />
          <StandPictures images={stand.relationships.pictures.data} />
          <QRCodeComponent title={`QR code de ${stand.attributes.name}`}/>
        </div>
        <div className='col s12 m4'>
          {
            stand.relationships.phones.data.length ?
              <StandPhones
                title='Contacto'
                phones={stand.relationships.phones.data} /> : null
          }
          <HorizontalSpace size='small' />
          <StandOwnerInfo owner={stand.relationships.owner.data.attributes} />
          <HorizontalSpace size='small' />
          <ExpoItem item={stand.relationships.expo.data}/>
          <GroupItem item={stand.relationships.group.data}/>
        </div>
      </div>
    </div>
  );
};

export default StandComponent;
