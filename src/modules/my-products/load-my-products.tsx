import React, {
  useEffect
} from 'react';
import APISDK from 'src/api/api-sdk/api-sdk';

const LoadMyProducts = (props: any): React.ReactElement => {
  useEffect(() => {
    props.setIsLoading(true);
    APISDK.GetUserProducts()
      .then(() => {
        props.setIsLoading(false);
      })
      .catch((error: any) => {
        props.setIsLoading(false);
        console.log(error);
      });
  }, [APISDK]);

  return <></>;
};

export default LoadMyProducts;
