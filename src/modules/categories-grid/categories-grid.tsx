import React, {
  useEffect
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { HorizontalSpace } from 'rrmc';
import fetchData from 'src/modules/utils/fetch-data';
import ParallaxHeaderImage from 'src/modules/parallax-header-image/parallax-header-image';
import GroupItem from 'src/modules/group-grid/group-item';
import SetSystemData from 'src/redux/actions/set-system-data';

const headerPictureFile = '/assets/digital-services.jpg';

const CategoriesGrid = ( props: any ): React.ReactElement => {
  const dispatch = useDispatch();
  const system = useSelector((state: any) => state.system);
  const items = system && system.categories ? system.categories : [];
  const prefix = system.platform.prefix;
  const headerPictureURL = `${prefix}${headerPictureFile}`;

  useEffect(() => {
    fetchData('groups/?fields[Group]=name,img_picture,slug&page[size]=20')
      .then((response: any) =>{
        // setitems(response);
        dispatch(SetSystemData({
          categories: response.data
        }));
      });
  }, [fetchData]);

  return (
    <>
      <ParallaxHeaderImage
        image={headerPictureURL}
        size='x-small'
        title='Categorías' />
      <HorizontalSpace size='small' />
      <div className='container'>
        <div className='row'>
          {
            items && items.length ?
              items.map((item: any, index: number) => {
                return (
                  <GroupItem
                    key={index}
                    item={item}
                    expoId={props.expoId}
                    col='col s12 m6 l4' />
                );
              }) : null
          }
        </div>
      </div>
    </>
  );
};

export default CategoriesGrid;
