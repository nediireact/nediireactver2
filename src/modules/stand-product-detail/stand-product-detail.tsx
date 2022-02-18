import React, {
  useEffect,
  useState
} from 'react';
import {
  useHistory,
  useParams
} from 'react-router';
import GenericItemDetail from 'src/modules/generic-item-detail/generic-item-detail';
import fetchData from 'src/modules/utils/fetch-data';

const StandProductDetail = (): React.ReactElement => {
  const history = useHistory();
  const params: any = useParams();
  const [product, setProduct]: any = useState({});

  useEffect(() => {
    fetchData(`products?filter[slug]=${params.productId}&include=product_pictures,stand,classification,delivery_type,features`)
    .then((response: any) => {
      if ( !response.data.length ) {
        console.log('Error de producto');
      } else {
        const productsData = response.data[0];
        if (!productsData) return history.replace('/');
        setProduct(productsData);
      }
    })
    .catch((error) => {
      console.log('Error de cargado de api', error);
    });
  }, [fetchData]);
  return (
    <>
      {
        product && product.id ?
          <GenericItemDetail item={product} /> : null
      }
    </>
  );
};

export default StandProductDetail;
