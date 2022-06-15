import React, {
  useEffect,
  useState
} from 'react';
import { useParams } from 'react-router-dom';
import {
  HorizontalSpace,
  SubTitle,
  SizesEnum
} from 'rrmc';
import APISDK from 'src/api/api-sdk';
import QRCode from 'qrcode.react'; // https://www.npmjs.com/package/qrcode.react
import SystemValues from 'src/constants/SystemValues';
import './expo-detail.scss';
import ExpoDetailContent from './expo-detail-content';
import ParallaxHeaderImage from 'src/components/parallax-header-image/parallax-header-image';
import GroupGrid from 'src/components/group-grid/group-grid';

const QRodeComponent = (): React.ReactElement => {
  const [canonicalURL, setCanonicalURL] = useState('');

  useEffect(() => {
    setCanonicalURL(window.location.href);
  }, [window]);

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
  const params: any = useParams();
  const exposById = SystemValues.getInstance().system.exposById;

  useEffect(() => {
    APISDK.GetExpoById(params.expoId);
  }, [APISDK]);

  return (
    <>
    {
      exposById && exposById[params.expoId] && exposById[params.expoId].id ?
        <>
        <ParallaxHeaderImage
          size='medium'
          image={exposById[params.expoId].attributes.img_picture}
          title={exposById[params.expoId].attributes.name}
          email={exposById[params.expoId].attributes.email}
          real={!exposById[params.expoId].attributes.real} />
        <HorizontalSpace size={SizesEnum.small} />
        <ExpoDetailContent description={exposById[params.expoId].attributes.description} />
        <GroupGrid
          data={exposById[params.expoId].relationships.groups.data}
          expoId={params.expoId} />
        <HorizontalSpace size={SizesEnum.small} />
        <QRodeComponent />
        <HorizontalSpace size={SizesEnum.small} />
        </> : null
    }
    </>
  );
};

export default ExpoDetailComponent;
