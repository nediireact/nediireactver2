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
import LoadMyServices from './load-my-services';
import ItemToEdit from 'src/modules/item-to-edit/item-to-edit';
import AddItemBasicInfo from 'src/modules/item-basic-info-form/item-basic-info-form';
import APISDK from 'src/api/api-sdk/api-sdk';

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
  }
];

const MyServices = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [valueReference, setValueReference] = useState('');
  const userData = useSelector((state: any) => state.user);
  const userProducts = userData && userData.userServices && userData.userServices.length ? userData.userServices : [];
  const [product, setProduct]: any = useState(null);

  useEffect(() => {
    const w: any = window;
    w.scrollTo(0, 0);
  }, [window]);

  const deleteItem = (id: number) => {
    if ( isLoading || !id ) return;
    setIsLoading(true);
    APISDK.DeleteProductById(id)
      .then(() => {
        return APISDK.GetUserProducts();
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <div className='col s12 m8 MyStands'>
      <LoadMyServices setIsLoading={setIsLoading} />
      <LoadingIndicator isLoading={isLoading} />
      {
        product || valueReference === 'add-item' ?
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
          valueReference !== 'add-item' ?
            <MenuChoiceMenu
              color='cyan'
              items={menuItems}
              valueReference={valueReference}
              setValueReference={setValueReference} /> : null
        }
        </> : null
      }
      {
        valueReference === 'step-1' ?
          <AddItemBasicInfo
            item={product}
            setStand={setProduct}
            isLoading={isLoading}
            setIsLoading={setIsLoading} /> : null
      }
      {
        !valueReference && !product ?
        <>
          <StrongText
            fullWidth={true}
            align='left'
            text={`${userProducts.length} Servicio${userProducts.length === 1 ? '' : 's'} registrado${userProducts.length === 1 ? '' : 's'}`} />
          <HorizontalSpace size='x-small' />
          <div className='row MyStands__stands-wrapper'>
            <ItemToEdit
              addLabel='Agregar servicio'
              setItem={setProduct}
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
                    url={`/empresa/${i.relationships.stand.data.attributes.slug}/servicios/${i.attributes.slug}`}
                    standName={i.relationships.stand.data.attributes.name}
                    valueReference={valueReference}
                    setValueReference={setValueReference}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    deleteItem={deleteItem} />
                );
              }) : null
            }
          </div>
        </> : null
      }
      {
        valueReference === 'add-item' ?
          <AddItemBasicInfo
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setItem={setProduct}
            itemType='Service'
            itemClassificacionType='ServiceClassification'
            setValueReference={setValueReference} /> : null
      }
    </div>
  );
};

export default MyServices;
