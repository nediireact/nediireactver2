import React, {
  useEffect,
  useState
} from 'react';
import {
  useNavigate,
  useParams
} from 'react-router-dom';
import {
  HorizontalSpace,
  SubTitle,
  SizesEnum
} from 'rrmc';
import APISDK from 'src/api/api-sdk';
import ParallaxHeaderImage from 'src/components/parallax-header-image/parallax-header-image';
import QRCode from 'qrcode.react'; // https://www.npmjs.com/package/qrcode.react
import StandGrid from 'src/components/stand-grid';
import GroupDetailContent from './group-detail-content';

const QRCodeComponent = ( props: any ): React.ReactElement => {
  const [canonicalURL, setCanonicalURL] = useState('');

  useEffect(() => {
    setCanonicalURL(window.location.href);
  }, [window]);

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
  const navigate = useNavigate();
  const params: any = useParams();
  const [group, setGroup]: any = useState({});
  const [stands, setStands]: any = useState([]);

  useEffect(() => {
    APISDK.GetGroupById(params.groupId)
      .then((response: any) => {
        if (response.data.length === 0) {
          console.log('Error, grupo no existe');
        } else {
          const groupsData = response.data[0];
          if (!groupsData) return navigate('/');
          setGroup(groupsData);
        }
      })
      .catch((error: any) => {
        console.log('Hubo un error', error);
      });
    if ( params.expoId ) {
      APISDK.GetStandsByGroupIdAndExpoId(params.groupId, params.expoId)
        .then((response: any) => {
          setStands(response);
        })
        .catch((error: any) => {
          console.log('Hubo un error', error);
        });
    } else {
      APISDK.GetGroupById(params.groupId)
        .then((response: any) => {
          setStands(response);
        })
        .catch((error: any) => {
          console.log('Hubo un error', error);
        });
    }
  }, [APISDK]);

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
          <HorizontalSpace size={SizesEnum.small} />
          <GroupDetailContent description={group.attributes.description} />
          {
            stands && stands.data && stands.data.length ?
              <StandGrid stands={stands.data} /> : null
          }
          <HorizontalSpace size={SizesEnum.small} />
          <QRCodeComponent color={group.attributes.color} />
          <HorizontalSpace size={SizesEnum.small} />
        </> : null
      }
    </div>
  );
};

export default GroupDetailComponent;
