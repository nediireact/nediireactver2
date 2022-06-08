/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import React, {
  useRef,
  useState,
  useEffect
} from 'react';
import {
  HorizontalSpace,
  StrongText,
  GenericTextInput,
  GenericImgInput,
  GenericTextArea,
  GenericCheckboxInput,
  GenericSelectInput,
  LoadingIndicator
} from 'rrmc';
import { useSelector } from 'react-redux';
import APISDK from 'src/api/api-sdk/api-sdk';
import LoadMyStands from 'src/modules/my-stands/load-my-stands';

const AddItemBasicInfo = ( props: any ): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const formRef: any = useRef(null);
  const item = props.item && props.item.id ? props.item : null;
  const [name, setName] = useState('');
  const [stand, setStand] = useState('');
  const [classification, setClassification] = useState('');
  const [imgPicture, setImgPicture] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [publishOnTheWall, setPublishOnTheWall] = useState(false);
  let cName = '';
  let cStand = '';
  let cClassification = '';
  let cPrice = '';
  let cDiscount = '';
  let cDescription = '';
  let cShortDescription = '';
  let cPublishOnTheWall = '';
  if ( item && item.attributes ) {
    if ( item.attributes.name ) cName = item.attributes.name;
    if ( item.attributes.price ) cPrice = item.attributes.price;
    if ( item.attributes.discount ) cDiscount = item.attributes.discount;
    if ( item.attributes.description ) cDescription = item.attributes.description;
    if ( item.attributes.short_description ) cShortDescription = item.attributes.short_description;
    if ( item.attributes.publish_on_the_wall ) cPublishOnTheWall = item.attributes.publish_on_the_wall;
  }
  if ( item && item.relationships ) {
    if ( item.relationships.stand &&
      item.relationships.stand.data &&
      item.relationships.stand.data.id ) {
      cStand = item.relationships.stand.data.id;
    }
    if ( item.relationships.classification &&
      item.relationships.classification.data &&
      item.relationships.classification.data.id ) {
      cClassification = item.relationships.classification.data.id;
    }
  }
  const userData = useSelector((state: any) => state.user);
  const userStands = userData && userData.userStands && userData.userStands.length ? userData.userStands : [];
  let itemClassifications: Array<any> = [];

  useEffect(() => {
    setIsLoading(true);
    APISDK.GetProductClassifications()
      .finally(() => {
        setIsLoading(false);
      });
  }, [APISDK]);

  const getStands = (): Array<any> => {
    const items: Array<any> = [];
    userStands.forEach((i: any) => {
      items.push({
        value: Number(i.id),
        text: i.attributes.name
      });
    });
    return items;
  };

  if ( props.itemType === 'Product' ) {
    itemClassifications = userData && userData.productClassifications &&
      userData.productClassifications.length ? userData.productClassifications : [];
  }

  const getClassifications = (): Array<any> => {
    const items: Array<any> = [];
    for (let i = 0; i < itemClassifications.length; i++) {
      const e = itemClassifications[i];
      if ( stand &&
        e.relationships &&
        e.relationships.stand &&
        e.relationships.stand.data &&
        e.relationships.stand.data.id &&
        e.relationships.stand.data.id === stand ) {
        items.push({
          value: Number(e.id),
          text: e.attributes.name
        });
      }
    }
    // console.log('items:', items);
    return items;
  };

  const addStand = (e: any) => {
    e.preventDefault();
    if ( isLoading ) return;
    setIsLoading(true);
    if ( item ) {
      const standToUpdate: any = {
        id: item.id
      };
      if ( name ) standToUpdate.name = name;
      APISDK.UpdateStand(standToUpdate)
        .then(() => {
          return APISDK.GetUserProducts();
        })
        .then((response: any) => {
          props.setItem(response);
          setIsLoading(false);
        })
        .catch((error: any) => {
          console.log('error', error);
          setIsLoading(false);
        });
    } else {
      const itemToCreate: any = {
        name: name ? name : cName,
        short_description: shortDescription,
        description: description,
        stand: Number(stand),
        classification: Number(classification),
        itemClassificacionType: props.itemClassificacionType,
        itemType: props.itemType,
        img_picture: imgPicture,
        price: Number(price),
        discount: Number(discount),
        publish_on_the_wall: publishOnTheWall
      };
      APISDK.AddBuyableItem(itemToCreate)
        .then(() => {
          return APISDK.GetUserProducts();
        })
        .then(() => {
          props.setItem(null); // temporary
          props.setValueReference(null);
          setIsLoading(false);
        })
        .catch((error: any) => {
          console.log('error', error);
          setIsLoading(false);
        });
    }
  };

  return (
  <>
    <LoadMyStands setIsLoading={setIsLoading} />
    <LoadingIndicator isLoading={isLoading} />
    {
      !item ? <StrongText text='Informacion basica' fullWidth={true} align='left' /> :
        <>
        <HorizontalSpace size='small' />
        <StrongText
          fullWidth={true}
          align='left'
          text={`Editando ${item.attributes.name}`} />
        </>
    }
    <form className='AddStandForm__form' onSubmit={addStand} ref={formRef}>
      <div className='input-field col s12 AddStandForm__sub-title'>
        <b>Informacion basica del producto</b>
      </div>
      <GenericSelectInput id='stand' placeholder='Empresa'
        items={getStands()} disabled={isLoading} value={cStand}
        setValue={setStand} required={stand ? false : true} />
      {
        getClassifications().length ?
          <GenericSelectInput id='classification' placeholder='Clasificacion'
            items={getClassifications()} disabled={isLoading} value={cClassification}
            setValue={setClassification} required={stand ? false : true} /> : null
      }
      <GenericTextInput id='name' type='text' placeholder='Nombre del producto'
        disabled={isLoading} value={cName}
        setValue={setName} required={stand ? false : true} />
      <GenericTextInput id='shortDescription' type='text' placeholder='Descripcion corta del producto'
        disabled={isLoading} value={cShortDescription} setValue={setShortDescription} required={stand ? false : true} />
      <GenericTextInput id='price' type='tel' placeholder='Precio del producto'
        disabled={isLoading} value={cPrice}
        setValue={setPrice} required={stand ? false : true} />
      <GenericTextInput id='discount' type='tel' placeholder='Descuento del producto'
        disabled={isLoading} value={cDiscount}
        setValue={setDiscount} required={stand ? false : true} />
      <GenericTextArea id='description' placeholder='Descripcion larga del producto'
        disabled={isLoading} value={cDescription} setValue={setDescription} />
      <GenericImgInput id='imgPicture' placeholder={stand ? 'Actualizar imagen de listado' : 'Imagen de listado'}
        disabled={isLoading} value={imgPicture} setValue={setImgPicture} required={stand ? false : true} />
      <div className='input-field col s12 AddStandForm__sub-title'>
        <GenericCheckboxInput id='publishOnTheWall' placeholder='Publicar en el muro?'
          checked={cPublishOnTheWall} setValue={setPublishOnTheWall} />
      </div>
      <div className='input-field col s12'>
        <input id='submit' type='submit'
          value='Guardar'
          className={`waves-effect waves-light btn right cyan ${isLoading && !item ? 'disabled' : ''}`}
          disabled={isLoading} />
      </div>
    </form>
  </>
  );
};

export default AddItemBasicInfo;
