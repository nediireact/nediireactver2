import React, {
  useEffect,
  useState
} from 'react';
import {
  useHistory,
  useParams
} from 'react-router-dom';
import fetchData from 'src/modules/utils/fetch-data';
import GroupDetailContent from 'src/modules/group-detail/group-detail-content';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import ParallaxHeaderImage from 'src/modules/parallax-header-image/parallax-header-image';
import SubTitle from 'src/modules/sub-title/sub-title';
import QRCode from 'qrcode.react'; // https://www.npmjs.com/package/qrcode.react
import StandGrid from 'src/modules/stand-grid/stand-grid';

const QRCodeComponent = ( props: any ): React.ReactElement => {
  const [canonicalURL, setCanonicalURL] = useState('');

  useEffect(() => {
    setCanonicalURL(window.location.href);
  });

  return (
    <div className='container QRCode'>
      <SubTitle text='QR code de este pabellon' />
      <QRCode
        value={canonicalURL}
        size={200}
        bgColor='#FFFFFF'
        fgColor={props.color} />
    </div>
  );
};

const GroupDetailComponent = (): React.ReactElement => {
  const history = useHistory();
  const params: any = useParams();
  const [group, setGroup]: any = useState({});
  const [stands, setStands]: any = useState([]);

  useEffect(() => {
    fetchData(`groups?filter[slug]=${params.groupId}`)
      .then((response: any) => {
        if (response.data.length === 0) {
          console.log('Error, grupo no existe');
        } else {
          const groupsData = response.data[0];
          if (!groupsData) return history.replace('/');
          setGroup(groupsData);
        }
      })
      .catch((error) => {
        console.log('Hubo un error', error);
      });
    const commonStandFields = '&fields[Stand]=name,slug,img_logo,img_cover,ratings,slogan,restaurant&fields[StandRating]=rating';
    const standsURL = params.expoId ?
      `stands/?filter[expo__slug]=${params.expoId}&filter[group__slug]=${params.groupId}&include=ratings${commonStandFields}` :
      `stands/?filter[group__slug]=${params.groupId}&include=ratings${commonStandFields}`;
    fetchData(standsURL)
      .then((response: any) => {
        setStands(response);
        console.log(response);
      })
      .catch((error) => {
        console.log('Hubo un error cargando los stands', error);
      });
  }, [fetchData]);

  return (
    <div>
      {
        group && group.id ?
        <>
          <ParallaxHeaderImage
            size='medium'
            image={group.attributes.img_picture}
            title={group.attributes.name}
            email={group.attributes.email} />
          <HorizontalSpace size='small' />
          <GroupDetailContent description={group.attributes.description} />
          {
            stands && stands.data && stands.data.length ?
              <StandGrid data={stands} /> : null
          }
          <HorizontalSpace size='small' />
          <QRCodeComponent color={group.attributes.color} />
          <HorizontalSpace size='small' />
        </> : null
      }
    </div>
  );
};

export default GroupDetailComponent;
