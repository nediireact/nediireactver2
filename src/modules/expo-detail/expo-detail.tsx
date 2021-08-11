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
import Groups from 'src/modules/group/group';
import QRCode from 'qrcode.react'; // https://www.npmjs.com/package/qrcode.react

const expoData = {
  attributes: {
    img_picture: '',
    title: '',
    description: '',
    real: '',
    email: '',
    slug: ''
  },
  relationships: {
    groups: {
      data: []
    }
  }
};

const QRodeComponent = (): React.ReactElement => {
  const [canonicalURL, setCanonicalURL] = useState('');

  useEffect(() => {
    setCanonicalURL(window.location.href);
  }, [fetchData]);

  return (
    <div className='container QRCode'>
      <SubTitle text='QR code de esta expo' />
      <QRCode
        value={canonicalURL}
        size={200}
        bgColor='#FFFFFF'
        fgColor='#000000' />
    </div>
  );
};

const ExpoDetail = (): React.ReactElement => {
  const history = useHistory();
  const params: any = useParams();
  const [expo, setExpo] = useState(expoData);

  useEffect(() => {
    fetchData(`expos?filter[slug]=${params.expoId}&include=groups`)
      .then((response: any) => {
        if (response.data.length === 0) {
          console.log('Error, expo no existe');
        } else {
          const expoData = response.data[0];
          if (!expoData) return history.replace('/');
          console.log('expoData', expoData);
          setExpo(expoData);
        }
      })
      .catch((error) => {
        console.log('Hubo un error', error);
      });
  }, [fetchData]);

  return (
    <div>
      <ParallaxHeaderImage
        size='large'
        image={expo.attributes.img_picture}
        title={expo.attributes.title}
        email={expo.attributes.email} />
      <HorizontalSpace size='small' />
      <ExpoDetailContent
        description={expo.attributes.description}/>
      <HorizontalSpace size='medium' />
      { expo.relationships.groups.data.length ? <SubTitle text='Pabellones en esta expo' /> : null }
      <HorizontalSpace size='small' />
      <Groups data={expo.relationships.groups} />
      <HorizontalSpace size='small' />
      <QRodeComponent />
      <HorizontalSpace size='small' />
    </div>
  );
};

export default ExpoDetail;
