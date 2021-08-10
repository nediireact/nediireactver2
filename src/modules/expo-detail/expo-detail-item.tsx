import React, {
  useEffect,
  useState
} from 'react';
import {
  useHistory,
  useParams
} from 'react-router-dom';
import fetchData from 'src/modules/utils/fetch-data';
import 'src/modules/expo-detail/expo-detail.scss';
import ExpoDetailContent from 'src/modules/expo-detail/expo-detail-content';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import ParallaxHeaderImage from 'src/modules/parallax-header-image/parallax-header-image';

const apiItem = {
  attributes: {
    img_picture: '',
    title: '',
    description: '',
    real: '',
    email: ''
  }
};

const ExpoDetailItem = (): React.ReactElement => {
  const history = useHistory();
  const params: any = useParams();
  const [expo, setExpo]: any = useState(apiItem);

  useEffect(() => {
    fetchData(`expos?filter[slug]=${params.expoId}`)
      .then((response: any) => {
        if (response.data.length === 0) {
          console.log('Error, expo no existe');
        } else {
          const expoData = response.data[0];
          if (!expoData) return history.replace('/');
          setExpo(expoData);
        }
      })
      .catch((error) => {
        console.log('Hubo un error', error);
      });
  }, [fetchData]);

  return (
    <div>
      <ParallaxHeaderImage
        size='large'
        image={expo.attributes.img_picture}
        title={expo.attributes.title}
        email={expo.attributes.email} />
      <HorizontalSpace size='small' />
      <ExpoDetailContent
        description={expo.attributes.description}/>
      <HorizontalSpace size='medium' />
    </div>
  );
};

export default ExpoDetailItem;
