import React, {
  useEffect,
  useState
} from 'react';
import { useSelector } from 'react-redux';
import fetchData from 'src/modules/utils/fetch-data';
import ExpoItem from 'src/modules/expo/expo-item';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import ParallaxHeaderImage from 'src/modules/parallax-header-image/parallax-header-image';
import 'src/modules/expo/expo.scss';

const headerPictureFile = '/assets/expos.jpg';
const apiItem = {
  data: [{
    id: 0,
    attributes: {
      img_picture: '',
      title: '',
      description: '',
      real: ''
    }
  }]
};

const Expo = (): React.ReactElement => {
  const [items, setitems]: any = useState(apiItem);
  const system = useSelector((state: any) => state.system);
  const prefix = system.platform.prefix;
  const headerPictureURL = `${prefix}${headerPictureFile}`;

  useEffect(() => {
    fetchData('expos')
      .then((response: any) =>{
        setitems(response);
      });
  }, [fetchData]);

  return (
    <>
      <ParallaxHeaderImage
        image={headerPictureURL}
        size='small'
        title='Expos Nedii' />
      <HorizontalSpace size='small' />
      <div className='container'>
        <div className='row'>
          {
            items.data.map((ExpoI: any, index: number) => {
              return (
                <ExpoItem
                  key={index}
                  ExpoI={ExpoI}/>
              );
            })
          }
        </div>
      </div>
    </>
  );
};

export default Expo;
