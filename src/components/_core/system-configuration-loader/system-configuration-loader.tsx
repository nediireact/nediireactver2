import React, {
  useEffect
} from 'react';
import APISDK from 'src/api/api-sdk';

const SystemConfigurationsLoader = (): React.ReactElement => {
  useEffect(() => {
    APISDK.GetSystemConfigurations();
  }, [APISDK]);

  return (<></>);
};

export default SystemConfigurationsLoader;
