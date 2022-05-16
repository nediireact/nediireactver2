import React, {
  useEffect,
  useState
} from 'react';
import { useSelector } from 'react-redux';
import {
  MenuChoiceMenu,
  LoadingIndicator,
  StrongText,
  HorizontalSpace
} from 'rrmc';
import './my-products.scss';
import LoadMyProducts from './load-my-products';
import ItemToEdit from 'src/modules/item-to-edit/item-to-edit';

const menuItems = [
  {
    name: 'Informacion basica',
    value: 'step-1',
    icon: 'house'
  },
  {
    name: 'Mulimedia',
    value: 'step-2',
    icon: 'image'
  },
  {
    name: 'Redes sociales',
    value: 'step-3',
    icon: 'group'
  },
  {
    name: 'Comunica...',
    value: 'step-5',
    icon: 'language'
  }
];

const MyProducts = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [valueReference, setValueReference] = useState('');
  const userData = useSelector((state: any) => state.user);
  const userProducts = userData && userData.userProducts && userData.userProducts.length ? userData.userProducts : [];
  const [product, setProduct]: any = useState(null);

  useEffect(() => {
    const w: any = window;
    w.scrollTo(0, 0);
  }, [window]);

  return (
    <div className='col s12 m8 MyStands'>
      <LoadMyProducts setIsLoading={setIsLoading} />
      <LoadingIndicator isLoading={isLoading} />
      {
        product || valueReference === 'add-stand' ?
          <div onClick={(e: any) => {
            e.preventDefault();
            setValueReference('');
            setProduct(null);
          }} className='MyStands__return-button'>
            <i className='material-icons white cyan-text'>arrow_back</i>
            <span>Regresar</span>
          </div> : null
      }
      {
        product ?
        <>
        {
          valueReference !== 'add-stand' ?
            <MenuChoiceMenu
              color='cyan'
              items={menuItems}
              valueReference={valueReference}
              setValueReference={setValueReference} /> : null
        }
        </> : null
      }
      {
        !valueReference && !product ?
        <>
          <StrongText
            fullWidth={true}
            align='left'
            text={`${userProducts.length} Producto${userProducts.length === 1 ? '' : 's'} registrado${userProducts.length === 1 ? '' : 's'}`} />
          <HorizontalSpace size='x-small' />
          <div className='row MyStands__stands-wrapper'>
            <ItemToEdit
              addLabel='Agregar producto'
              setItem={setProduct}
              valueReference={valueReference}
              setValueReference={setValueReference} />
            {
              userProducts && userProducts.length ?
              userProducts.map((i: any, index: number) => {
                return (
                  <ItemToEdit
                    key={index}
                    item={i}
                    setItem={setProduct}
                    id={i.id}
                    name={i.attributes.name}
                    image={i.attributes.img_picture}
                    url={`/empresa/${i.relationships.stand.data.attributes.slug}/productos/${i.attributes.slug}`}
                    valueReference={valueReference}
                    setValueReference={setValueReference}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading} />
                );
              }) : null
            }
          </div>
        </> : null
      }
    </div>
  );
};

export default MyProducts;
