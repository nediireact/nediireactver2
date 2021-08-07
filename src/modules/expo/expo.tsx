import React, {
  useEffect,
  useState
} from 'react';
import fetchData from 'src/modules/utils/fetch-data';
import ExpoItem from 'src/modules/expo/expo-item';
import 'src/modules/expo/expo.scss';

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

  useEffect(() => {
    fetchData('expos')
      .then((response: any) =>{
        setitems(response);
      });
  }, [fetchData]);

  return (
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
  );
};

export default Expo;
