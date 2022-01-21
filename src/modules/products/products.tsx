import React, {
  useEffect,
  useState
} from 'react';
import fetchData from 'src/modules/utils/fetch-data';
import BuyableItem from 'src/modules/buyable-item/buyable-item';

const StandProducts = (props: any): React.ReactElement => {
  const [products, setProducts] = useState([]);
  const baseURL = `products/?filter[stand]=${props.standId}`;

  useEffect(() => {
    fetchData(baseURL)
      .then((response: any) => {
        const prod = response.data;
        setProducts(prod);
      })
      .catch((error) => console.log('Hubo un error', error));
  }, [fetchData]);

  return (
    <>
    {
      products.map((i: any, index: number) => {
        return (
          <BuyableItem key={index} size='col s12 m4' truncate={true}
            colorCard='white'
            type='producto'
            item={i.attributes}
            standSlug={props.standSlug} />
        );
      })
    }
    </>
  );
};

export default StandProducts;
