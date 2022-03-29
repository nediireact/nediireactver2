import React, {
  useRef,
  useState
} from 'react';
import 'src/modules/my-stands/add-stand-form.scss';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import StrongText from 'src/modules/strong-text/strong-text';
import GenericTextInput from 'src/modules/form-components/generic-text-input';
import GenericImgInput from 'src/modules/form-components/generic-img-input';
import GenericTextArea from 'src/modules/form-components/generic-text-area';
import GenericCheckboxInput from 'src/modules/form-components/generic-checkbox-input';
import MenuChoiceMenu from 'src/modules/multi-choice-menu/multi-choice-menu';
import NediiPlans from 'src/modules/nedii-plans/nedii-plans';

const menuItems = [
  {
    name: 'Paso 1',
    value: 'step-1',
    icon: 'house'
  },
  {
    name: 'Paso 2',
    value: 'step-2',
    icon: 'work'
  },
  {
    name: 'Paso 3',
    value: 'step-3',
    icon: 'work'
  },
  {
    name: 'Paso 4',
    value: 'step-5',
    icon: 'work'
  }
];

const AddStandForm = (props: any): React.ReactElement => {
  const formRef: any = useRef(null);
  const [name, setname] = useState('');
  const [slogan, setSlogan] = useState('');
  const [slug, setSlug] = useState('');
  const [logo, setLogo] = useState('');
  const [cover, setCover] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [restaurant, setRestaurant] = useState(false);
  const [valueReference, setValueReference] = useState('step-1');

  return (
    <div className='AddStandForm'>
      <StrongText
        fullWidth={true}
        align='left'
        text='Agregar empresa' />
      <HorizontalSpace size='xxx-small' />
      <MenuChoiceMenu
        title='Pasos para agregar la empresa'
        items={menuItems}
        valueReference={valueReference}
        setValueReference={setValueReference} />
      <HorizontalSpace size='small' />
      {
        valueReference === 'step-1' ?
          <>
            <form className='AddStandForm__form' onSubmit={() => {
              console.log('hola');
            }} ref={formRef}>
              <p>Informacion basica de la empresa</p>
              <GenericTextInput id='name' type='text' placeholder='Nombre de la empresa'
                disabled={props.isLoading} value={name} setValue={setname} required={true} />
              <GenericTextInput id='slug' type='text' placeholder='Identificador de URL de la empresa'
                disabled={props.isLoading} value={slug} setValue={setSlug} required={true} />
              <GenericTextInput id='slogan' type='text' placeholder='Slogan de la empresa'
                disabled={props.isLoading} value={slogan} setValue={setSlogan} required={true} />
              <GenericImgInput id='logo' placeholder='Logo de la empresa'
                disabled={props.isLoading} value={logo} setValue={setLogo} required={true} />
              <GenericImgInput id='cover' placeholder='Imagen de encabezado de la empresa'
                disabled={props.isLoading} value={cover} setValue={setCover} required={true} />
              <GenericTextInput id='shortDescription' type='text' placeholder='Descripcion corta de la empresa'
                disabled={props.isLoading} value={shortDescription} setValue={setShortDescription} required={true} />
              <GenericTextArea id='description' placeholder='Descripcion larga de la empresa'
                disabled={props.isLoading} value={description} setValue={setDescription} />
              <GenericCheckboxInput id='promotions' placeholder='El negocio es un restaurante?'
                checked={restaurant} setValue={setRestaurant} />
          </form>
          <HorizontalSpace size='small' />
          <StrongText text='Planes Nedii' fullWidth={true} align='left' />
          <p>Para continuar seleccione un Plan de Nedii.</p>
          <NediiPlans />
        </> : null
      }
    </div>
  );
};

export default AddStandForm;
