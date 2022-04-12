import React, {
  useEffect,
  useState
} from 'react';
import { useSelector } from 'react-redux';
import { HorizontalSpace } from 'rrmc';
import './expo-grid.scss';
import fetchData from 'src/modules/utils/fetch-data';
import ExpoItem from 'src/modules/expo-grid/expo-item';
import ParallaxHeaderImage from 'src/modules/parallax-header-image/parallax-header-image';

const headerPictureFile = '/assets/expos.jpg';

const ExpoGrid = (): React.ReactElement => {
  const [items, setitems]: any = useState([]);
  const system = useSelector((state: any) => state.system);
  const prefix = system.platform.prefix;
  const headerPictureURL = `${prefix}${headerPictureFile}`;

  useEffect(() => {
    fetchData('expos?fields[Expo]=name,img_picture,slug,real')
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
            items && items.data && items.data.length ?
              items.data.map((item: any, index: number) => {
                return (
                  <ExpoItem
                    key={index}
                    item={item}
                    col='col s12 m6 l4' />
                );
              }) : null
          }
        </div>
      </div>
    </>
  );
};

export default ExpoGrid;
