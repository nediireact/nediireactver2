import React from 'react';
import { useSelector } from 'react-redux';
import SubTitle from 'src/modules/sub-title/sub-title';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import ParallaxHeaderImage from 'src/modules/parallax-header-image/parallax-header-image';

const headerPictureFile = '/assets/login.jpg';

const CommonDocument = ( props: any ): React.ReactElement => {
  const system = useSelector((state: any) => state.system);
  const prefix = system.platform.prefix;
  const headerPictureURL = `${prefix}${headerPictureFile}`;

  return (
    <>
    {
      system && system.configurations && system.configurations.id ?
        <>
        <ParallaxHeaderImage
          image={headerPictureURL}
          gradientOpacity='0.2'
          size='x-small'
          title={props.title} />
        <div className='container row'>
          <div className='col s1 hide-on-small-only'></div>
          <div className='col s12 m10'>
            <HorizontalSpace size='medium' />
            <SubTitle text={props.title} />
            <div dangerouslySetInnerHTML={{__html: system.configurations.attributes[props.attr_key]}}></div>
            <HorizontalSpace size='medium' />
          </div>
          <div className='col s1 hide-on-small-only'></div>
        </div>
        </> : null
    }
    </>
  );
};

export default CommonDocument;
