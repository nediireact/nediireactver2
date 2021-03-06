import React, {
  useEffect,
  useState
} from 'react';
import {
  useNavigate,
  useParams
} from 'react-router-dom';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  HorizontalSpace,
  SubTitle,
  LoadingIndicator
} from 'rrmc';
import QRCode from 'qrcode.react'; // https://www.npmjs.com/package/qrcode.react
import './expo-detail.scss';
import ExpoDetailContent from './expo-detail-content';
import fetchData from 'src/modules/utils/fetch-data';
import ParallaxHeaderImage from 'src/modules/parallax-header-image/parallax-header-image';
import GroupGrid from 'src/modules/group-grid/group-grid';
import SetExpoData from 'src/redux/actions/set-expo-data';

const QRodeComponent = (): React.ReactElement => {
  const [canonicalURL, setCanonicalURL] = useState('');

  useEffect(() => {
    setCanonicalURL(window.location.href);
  }, [fetchData, window]);

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
  const navigate = useNavigate();
  const params: any = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const expo = useSelector((state: any) => state.expo);

  useEffect(() => {
    setIsLoading(true);
    fetchData(`expos?filter[slug]=${params.expoId}&include=groups&fields[Group]=name,img_picture,slug`)
      .then((response: any) => {
        setIsLoading(false);
        if (response.data.length === 0) {
          console.log('Error, expo no existe');
        } else {
          const expoData = response.data[0];
          if (!expoData) return navigate('/');
          dispatch(SetExpoData(expoData));
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log('Hubo un error', error);
      });
  }, [fetchData]);

  return (
    <>
    <LoadingIndicator isLoading={isLoading} />
    {
      expo && expo[params.expoId] && expo[params.expoId].id ?
        <>
        <ParallaxHeaderImage
          size='medium'
          image={expo[params.expoId].attributes.img_picture}
          title={expo[params.expoId].attributes.name}
          email={expo[params.expoId].attributes.email}
          real={!expo[params.expoId].attributes.real} />
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
