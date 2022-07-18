import React, {
  useEffect
} from 'react';
import {
  HorizontalSpace,
  SizesEnum
} from 'rrmc';
import APISDK from 'src/api/api-sdk';
import SystemValues from 'src/constants/SystemValues';
import ParallaxHeaderImage from 'src/components/parallax-header-image';
import GroupItem from 'src/components/group-grid';

const headerPictureFile = '/assets/digital-services.jpg';

const CategoriesGrid = ( props: any ): React.ReactElement => {
  const system = SystemValues.getInstance().system;
  const prefix = system.platform.prefix;
  const items = system && system.categories ? system.categories : [];
  const headerPictureURL = `${prefix}${headerPictureFile}`;

  useEffect(() => {
    APISDK.GetCategories();
  }, [APISDK]);

  return (
    <>
      <ParallaxHeaderImage
        image={headerPictureURL}
        size='x-small'
        title='Categorías' />
      <HorizontalSpace size={SizesEnum.small} />
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
