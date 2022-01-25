import React, {
  useEffect
} from 'react';
import { useDispatch } from 'react-redux';
import fetchData from 'src/modules/utils/fetch-data';
import SetSystemConfigurations from 'src/redux/actions/set-system-configurations';

interface SystemConfigurationLoaderInterface {
  basic?: boolean;
  home?: boolean;
  privacy_policy?: boolean;
  terms_and_conditions?: boolean;
  user_data?: boolean;
}

const SystemConfigurationLoader = ( props: SystemConfigurationLoaderInterface ): React.ReactElement => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData(`system/?${
      props.basic ? 'fields[System]=site_name,img_logo' : ''
    }${
      props.home ? 'include=home_pictures&fields[System]=site_name,img_logo,home_pictures' : ''
    }${
      props.privacy_policy ? 'fields[System]=site_name,img_logo,privacy_policy' : ''
    }${
      props.terms_and_conditions ? 'fields[System]=site_name,img_logo,terms_and_conditions' : ''
    }${
      props.user_data ? 'fields[System]=site_name,img_logo,user_data' : ''
    }`)
      .then((response: any) => {
        if (response.data.length) {
          const systemConfiguration = response.data[0];
          dispatch(SetSystemConfigurations(systemConfiguration));
        }
      })
      .catch((error) => {
        console.log('Hubo un error', error);
      });
  }, [fetchData]);

  return (<></>);
};

export default SystemConfigurationLoader;
