import React, {
  useEffect,
  useState
} from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import fetchData from 'src/modules/utils/fetch-data';
import SubTitle from 'src/modules/sub-title/sub-title';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import ParallaxHeaderImage from 'src/modules/parallax-header-image/parallax-header-image';

const systemData: any = {
  attributes: {
    site_name: '',
    privacy_policy: '',
    terms_and_conditions: '',
    user_data: ''
  }
};
const headerPictureFile = '/assets/login.jpg';

const CommonDocument = ( props: any ): React.ReactElement => {
  const system = useSelector((state: any) => state.system);
  const prefix = system.platform.prefix;
  const headerPictureURL = `${prefix}${headerPictureFile}`;
  const history = useHistory();
  const [systemPage, setSystemPage] = useState(systemData);

  useEffect(() => {
    fetchData('system')
      .then((response: any) => {
        if (response.data.length === 0) {
          console.log('Error, stand no existe');
          return history.replace('/');
        }
        const systemData = response.data[0];
        if (!systemData) return history.replace('/');
        setSystemPage(systemData);
      })
      .catch((error) => {
        console.log('Hubo un error', error);
        return history.replace('/');
      });
  }, [fetchData]);

  return (
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
          <div dangerouslySetInnerHTML={{__html: systemPage.attributes[props.attr_key]}}></div>
          <HorizontalSpace size='medium' />
        </div>
        <div className='col s1 hide-on-small-only'></div>
      </div>
    </>
  );
};

export default CommonDocument;
