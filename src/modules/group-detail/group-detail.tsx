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
import ExpoDetailContent from 'src/modules/expo-detail/expo-detail-content';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import ParallaxHeaderImage from 'src/modules/parallax-header-image/parallax-header-image';
import SubTitle from 'src/modules/sub-title/sub-title';
import QRCode from 'qrcode.react'; // https://www.npmjs.com/package/qrcode.react

const expoData = {
  attributes: {
    img_picture: '',
    title: '',
    description: '',
    real: '',
    email: '',
    slug: '',
    color: ''
  },
  relationships: {
  }
};

const QRodeComponent = ( props: any ): React.ReactElement => {
  const [canonicalURL, setCanonicalURL] = useState('');

  useEffect(() => {
    setCanonicalURL(window.location.href);
  }, [fetchData]);

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

  useEffect(() => {
    fetchData(`groups?filter[slug]=${params.groupId}`)
      .then((response: any) => {
        if (response.data.length === 0) {
          console.log('Error, grupo no existe');
        } else {
          const expoData = response.data[0];
          if (!expoData) return history.replace('/');
          console.log('expoData', expoData);
          setGroup(expoData);
        }
      })
      .catch((error) => {
        console.log('Hubo un error', error);
      });
    fetchData(`stands/?filter[expo__slug]=${params.expoId}&filter[group__slug]=${params.groupId}`)
      .then((response: any) => {
        console.log('Stands:', response);
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
        title={group.attributes.title}
        email={group.attributes.email} />
      <HorizontalSpace size='small' />
      <ExpoDetailContent
        description={group.attributes.description}/>
      <HorizontalSpace size='medium' />
      <QRodeComponent color={group.attributes.color}/>
      <HorizontalSpace size='small' />
    </div>
  );
};

export default GroupDetailComponent;
