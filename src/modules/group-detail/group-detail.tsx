import React, {
  useEffect,
  useState
} from 'react';
import {
  useHistory,
  useParams
} from 'react-router-dom';
import fetchData from 'src/modules/utils/fetch-data';
import 'src/modules/expo-detail/expo-detail.scss';
import GroupDetailContent from 'src/modules/group-detail/group-detail-content';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import ParallaxHeaderImage from 'src/modules/parallax-header-image/parallax-header-image';
import SubTitle from 'src/modules/sub-title/sub-title';
import QRCode from 'qrcode.react'; // https://www.npmjs.com/package/qrcode.react
import StandGrid from 'src/modules/stand-grid/stand-grid';

const expoData = {
  attributes: {
    img_picture: '',
    name: '',
    description: '',
    real: '',
    email: '',
    slug: '',
    color: ''
  },
  relationships: {
  }
};

const standsData = {
  data: []
};

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
  const [group, setGroup] = useState(expoData);
  const [stands, setStands] = useState(standsData);

  useEffect(() => {
    fetchData(`groups?filter[slug]=${params.groupId}`)
      .then((response: any) => {
        if (response.data.length === 0) {
          console.log('Error, grupo no existe');
        } else {
          const expoData = response.data[0];
          if (!expoData) return history.replace('/');
          setGroup(expoData);
        }
      })
      .catch((error) => {
        console.log('Hubo un error', error);
      });
    fetchData(`stands/?filter[expo__slug]=${params.expoId}&filter[group__slug]=${params.groupId}&include=ratings`)
      .then((response: any) => {
        setStands(response);
        console.log('Stands:', stands, response);
      })
      .catch((error) => {
        console.log('Hubo un error cargando los stands', error);
      });
  }, [fetchData]);

  return (
    <div>
      <ParallaxHeaderImage
        size='large'
        image={group.attributes.img_picture}
        title={group.attributes.name}
        email={group.attributes.email} />
      <HorizontalSpace size='small' />
      <GroupDetailContent description={group.attributes.description} />
      <HorizontalSpace size='medium' />
      { stands.data.length ? <SubTitle text='Stands de este pabellon' /> : null }
      <HorizontalSpace size='small' />
      <StandGrid data={stands} />
      <HorizontalSpace size='small' />
      <QRCodeComponent color={group.attributes.color} />
      <HorizontalSpace size='small' />
    </div>
  );
};

export default GroupDetailComponent;
