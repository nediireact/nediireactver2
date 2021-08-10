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
import ExpoHeaderPicture from 'src/modules/expo-detail/expo-header-picture';
import ExpoHead from 'src/modules/expo-detail/expo-detail-head';
import ExpoDetailContent from 'src/modules/expo-detail/expo-detail-content';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';

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
      <ExpoHeaderPicture
        image={expo.attributes.img_picture}/>
      <HorizontalSpace size='medium' />
      <ExpoHead
        title={expo.attributes.title}
        email={expo.attributes.email}/>
      <ExpoDetailContent
        description={expo.attributes.description}/>
    </div>
  );
};

export default ExpoDetailItem;
