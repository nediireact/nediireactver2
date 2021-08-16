import React, {
  useEffect,
  useState
} from 'react';
import {
  useHistory,
  useParams
} from 'react-router-dom';
import fetchData from 'src/modules/utils/fetch-data';
import 'src/modules/stand-detail/stand-detail.scss';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';

const standData = {
  attributes: {
    name: '',
    slug: ''
  },
  relationships: {
  }
};

const StandDetailComponent = (): React.ReactElement => {
  const history = useHistory();
  const params: any = useParams();
  const [stand, setStand] = useState(standData);

  useEffect(() => {
    fetchData(`stands?filter[slug]=${params.standId}&include=owner`)
      .then((response: any) => {
        if (response.data.length === 0) {
          console.log('Error, stand no existe');
        } else {
          const standData = response.data[0];
          if (!standData) return history.replace('/');
          console.log('standData', standData, stand);
          setStand(standData);
        }
      })
      .catch((error) => {
        console.log('Hubo un error', error);
      });
  }, [fetchData]);

  return (
    <div>
      <HorizontalSpace size='medium' />
      {stand.attributes.name}
      <HorizontalSpace size='small' />
    </div>
  );
};

export default StandDetailComponent;
