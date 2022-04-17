import React, {
  useRef,
  useState
} from 'react';
import {
  HorizontalSpace,
  StrongText,
  GenericTextInput,
  GenericImgInput,
  GenericTextArea,
  GenericCheckboxInput,
  MenuChoiceMenu,
  GenericSelectInput
} from 'rrmc';
import { useSelector } from 'react-redux';
import APISDK from 'src/api/api-sdk/api-sdk';
import './add-stand-form.scss';
import NediiPlans from 'src/modules/nedii-plans/nedii-plans';

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

const AddStandForm = (props: any): React.ReactElement => {
  const system: any = useSelector((state: any) => state.system);
  const expos = system && system.homeExpos ? system.homeExpos : [];
  const categories = system && system.categories ? system.categories : [];
  const formRef: any = useRef(null);
  const [name, setname] = useState('');
  const [slogan, setSlogan] = useState('');
  const [logo, setLogo] = useState('');
  const [cover, setCover] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [neighbor, setNeighbor] = useState('');
  const [address, setAddress] = useState('');
  const [expo, setExpo] = useState('');
  const [category, setCategory] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [restaurant, setRestaurant] = useState(false);
  const [alwaysOpen, setAlwaysOpen] = useState(false);
  const [contactEmail, setContactEmail] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [plan, setPlan] = useState(0);
  const [valueReference, setValueReference] = useState('step-1');

  const getExpos = (): Array<any> => {
    const items: Array<any> = [];
    expos.forEach((i: any) => {
      items.push({
        value: i.id,
        text: i.attributes.name
      });
    });
    return items;
  };
  const getCategories = (): Array<any> => {
    const items: Array<any> = [];
    categories.forEach((i: any) => {
      items.push({
        value: i.id,
        text: i.attributes.name
      });
    });
    return items;
  };

  const addStand = (e: any) => {
    e.preventDefault();
    if ( props.isLoading ) return;
    const stand: any = {
      name: name,
      slogan: slogan,
      img_logo: logo,
      img_cover: cover,
      state: state,
      city: city,
      address: `${address}, ${neighbor}`,
      short_description: shortDescription,
      description: description,
      restaurant: restaurant,
      contact_email: contactEmail,
      plan: plan,
      expo: expo,
      group: category,
      support_email: supportEmail,
      phone1: phone1,
      phone2: phone2,
      always_open: alwaysOpen
    };
    APISDK.AddStand(stand)
      .then((response: any) => {
        console.log('response', response);
      })
      .catch((error: any) => {
        console.log('error', error);
      });
  };

  return (
    <div className='AddStandForm'>
      <StrongText
        fullWidth={true}
        align='left'
        text='Agregar empresa' />
      <HorizontalSpace size='xxx-small' />
      <MenuChoiceMenu
        title='Pasos para agregar la empresa'
        color='cyan'
        items={menuItems}
        valueReference={valueReference}
        setValueReference={setValueReference} />
      <HorizontalSpace size='small' />
      {
        valueReference === 'step-1' ?
          <>
            <StrongText text='Paso 1 - Informacion basica' fullWidth={true} align='left' />
            <form className='AddStandForm__form' onSubmit={addStand} ref={formRef}>

              <div className='input-field col s12 AddStandForm__sub-title'>
                <HorizontalSpace size='x-small' />
                <b>Informacion basica de la empresa</b>
              </div>
              <GenericTextInput id='name' type='text' placeholder='Nombre de la empresa'
                disabled={props.isLoading} value={name} setValue={setname} required={true} />
              <GenericSelectInput id='expo' placeholder='Expo' items={getExpos()}
                disabled={props.isLoading} value={expo} setValue={setExpo} required={true} />
              <GenericSelectInput id='category' placeholder='Categoria' items={getCategories()}
                disabled={props.isLoading} value={category} setValue={setCategory} required={true} />

              <div className='input-field col s12 AddStandForm__sub-title'>
                <HorizontalSpace size='x-small' />
                <b>Direccion de la empresa</b>
              </div>
              <GenericTextInput id='state' type='text' placeholder='Estado del pais'
                disabled={props.isLoading} value={state} setValue={setState} required={true} />
              <GenericTextInput id='city' type='text' placeholder='Ciudad'
                disabled={props.isLoading} value={city} setValue={setCity} required={true} />
              <GenericTextInput id='neighbor' type='text' placeholder='Colonia'
                disabled={props.isLoading} value={neighbor} setValue={setNeighbor} required={true} />
              <GenericTextInput id='address' type='text' placeholder='Calle, numero'
                disabled={props.isLoading} value={address} setValue={setAddress} required={true} />

              <div className='input-field col s12 AddStandForm__sub-title'>
                <HorizontalSpace size='x-small' />
                <b>Identidad de la empresa</b>
              </div>
              <GenericTextInput id='slogan' type='text' placeholder='Slogan de la empresa'
                disabled={props.isLoading} value={slogan} setValue={setSlogan} required={true} />
              <GenericTextInput id='shortDescription' type='text' placeholder='Descripcion corta de la empresa'
                disabled={props.isLoading} value={shortDescription} setValue={setShortDescription} required={true} />
              <GenericTextArea id='description' placeholder='Descripcion larga de la empresa'
                disabled={props.isLoading} value={description} setValue={setDescription} />
              <GenericImgInput id='logo' placeholder='Logo de la empresa'
                disabled={props.isLoading} value={logo} setValue={setLogo} required={true} />
              <GenericImgInput id='cover' placeholder='Imagen de encabezado de la empresa'
                disabled={props.isLoading} value={cover} setValue={setCover} required={true} />
              <div className='input-field col s12 AddStandForm__sub-title'>
                <GenericCheckboxInput id='promotions' placeholder='La empresa es un restaurante?'
                  checked={restaurant} setValue={setRestaurant} />
                </div>
              <div className='input-field col s12 AddStandForm__sub-title'>
                <GenericCheckboxInput id='alwaysOpen' placeholder='La empresa abierta 24 horas?'
                  checked={alwaysOpen} setValue={setAlwaysOpen} />
              </div>

              <div className='input-field col s12 AddStandForm__sub-title'>
                <HorizontalSpace size='x-small' />
                <b>Datos de contacto</b>
              </div>
              <GenericTextInput id='contactEmail' type='email' placeholder='Email de contacto'
                disabled={props.isLoading} value={contactEmail} setValue={setContactEmail} required={true} />
              <GenericTextInput id='supportEmail' type='email' placeholder='Email de soporte'
                disabled={props.isLoading} value={supportEmail} setValue={setSupportEmail} />
              <GenericTextInput id='phone1' type='tel' placeholder='Telefono de contacto'
                disabled={props.isLoading} value={phone1} setValue={setPhone1} />
              <GenericTextInput id='phone2' type='tel' placeholder='Telefono de oficina'
                disabled={props.isLoading} value={phone2} setValue={setPhone2} />

              <div className='input-field col s12'>
                <HorizontalSpace size='xx-small' />
              </div>

              <StrongText text='Paso 2 - Planes Nedii' fullWidth={true} align='left' />
              <p>Para continuar seleccione un Plan de Nedii.</p>
              <NediiPlans setValue={setPlan} plan={plan} />

              <div className='input-field col s12'>
                <input id='submit' type='submit'
                  value='Guardar'
                  className={`waves-effect waves-light btn right cyan ${ props.isLoading || !plan ? 'disabled' : ''}`}
                  disabled={props.isLoading} />
              </div>
            </form>
          </> : null
      }
    </div>
  );
};

export default AddStandForm;
