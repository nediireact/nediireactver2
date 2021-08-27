import React, {
  useEffect,
  useState
} from 'react';
import SubTitle from 'src/modules/sub-title/sub-title';
import QRCode from 'qrcode.react'; // https://www.npmjs.com/package/qrcode.react

const QRCodeComponent = ( props: any ): React.ReactElement => {
  const [canonicalURL, setCanonicalURL] = useState('');

  useEffect(() => {
    setCanonicalURL(window.location.href);
  });

  return (
    <div className='container QRCode'>
      <SubTitle text={props.title} />
      <QRCode
        value={canonicalURL}
        size={200}
        bgColor='#FFFFFF'
        fgColor={props.color} />
    </div>
  );
};

export default QRCodeComponent;
