import React, {
  useEffect,
  useState
} from 'react';
import {
  useHistory,
  useParams
} from 'react-router-dom';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import fetchData from 'src/modules/utils/fetch-data';
import 'src/modules/expo-detail/expo-detail.scss';
import ExpoDetailContent from 'src/modules/expo-detail/expo-detail-content';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import ParallaxHeaderImage from 'src/modules/parallax-header-image/parallax-header-image';
import SubTitle from 'src/modules/sub-title/sub-title';
import GroupGrid from 'src/modules/group-grid/group-grid';
import QRCode from 'qrcode.react'; // https://www.npmjs.com/package/qrcode.react
import SetExpoData from 'src/redux/actions/set-expo-data';

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

const ExpoDetailComponent = (): React.ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params: any = useParams();
  const expo = useSelector((state: any) => state.expo);

  useEffect(() => {
    fetchData(`expos?filter[slug]=${params.expoId}&include=groups&fields[Group]=name,img_picture,slug`)
      .then((response: any) => {
        if (response.data.length === 0) {
          console.log('Error, expo no existe');
        } else {
          const expoData = response.data[0];
          if (!expoData) return history.replace('/');
          dispatch(SetExpoData(expoData));
        }
      })
      .catch((error) => {
        console.log('Hubo un error', error);
      });
  }, [fetchData]);

  return (
    <>
    {
      expo && expo[params.expoId] && expo[params.expoId].id ?
        <>
        <ParallaxHeaderImage
          size='medium'
          image={expo[params.expoId].attributes.img_picture}
          title={expo[params.expoId].attributes.name}
          email={expo[params.expoId].attributes.email}
          indicator={!expo[params.expoId].attributes.real}/>
        <HorizontalSpace size='small' />
        <ExpoDetailContent description={expo[params.expoId].attributes.description} />
        <GroupGrid
          data={expo[params.expoId].relationships.groups.data}
          expoId={params.expoId} />
        <HorizontalSpace size='small' />
        <QRodeComponent />
        <HorizontalSpace size='small' />
        </> : null
    }
    </>
  );
};

export default ExpoDetailComponent;
