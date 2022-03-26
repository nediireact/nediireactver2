import React, {
  useState
} from 'react';
import APISDK from 'src/api/api-sdk/api-sdk';
import StrongText from 'src/modules/strong-text/strong-text';
import BasicIcon from 'src/modules/basic-icon/basic-icon';
import GenericTextInput from 'src/modules/form-components/generic-text-input';
import 'src/modules/user-address/user-address.scss';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';

const MenuOptionItem = (props: any): React.ReactElement => {
  return (
    <div className='UserAddress__address-type-item' onClick={() => {
        props.setAddressType(props.value);
      }}>
      <i className={`material-icons hoverable white-text ${
        props.addressType === props.value ? 'cyan' : 'grey lighten-1'
      }`}>
        {props.icon}
      </i>
      <span className={props.addressType === props.value ? 'cyan-text' : ''}>
        {props.name}
      </span>
    </div>
  );
};

const EditUserAddress = (props: any): React.ReactElement => {
  const item = props.item;
  const [alias, setAlias] = useState(item.attributes.alias);
  const [receptorName, setReceptorName] = useState(item.attributes.receptor_name);
  const [phone, setPhone] = useState(item.attributes.phone);
  const [state, setState] = useState(item.relationships.city.data.relationships.state.data.attributes.name);
  const [city, setCity] = useState(item.relationships.city.data.attributes.name);
  const [zipCode, setZipCode] = useState(item.attributes.zip_code);
  const [street, setStreet] = useState(item.attributes.street);
  const [extNumber, setExtNumber] = useState(item.attributes.ext_number);
  const [intNumber, setIntNumber] = useState(item.attributes.int_number);
  const [reference, setReference] = useState(item.attributes.reference);
  const [deliveryInstructions, setDeliveryInstructions] = useState(item.attributes.delivery_instructions);
  const [addressType, setAddressType] = useState(item.attributes.address_type);

  const updateUserAddress = (e: any) => {
    e.preventDefault();
    if ( props.isLoading ) return;
    const address: any = {
      id: item.id,
      alias: alias,
      state: state,
      city: city,
      zip_code: zipCode,
      street: street,
      int_number: intNumber,
      ext_number: extNumber,
      reference: reference,
      delivery_instructions: deliveryInstructions,
      phone: phone,
      receptor_name: receptorName,
      address_type: addressType
    };
    props.setIsLoading(true);
    APISDK.UpdateUserAddress(address)
      .then(() => {
        props.setEditing(false);
        props.setIsLoading(false);
      })
      .catch((error: any) => {
        props.setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <>
    <div className='UserAddress__header'>
      <StrongText
        color='#00acc1'
        fullWidth={true}
        text='Editar direccion' />
      <div className='UserAddress__flex-filler'></div>
      <BasicIcon
        icon='close'
        color='red-text text-lighten-1'
        disabled={props.isLoading}
        action={() => {
          props.setEditing(!props.editing);
        }}
        noPadding={true} />
    </div>
    <form onSubmit={updateUserAddress}>
      <GenericTextInput id='alias' type='text' placeholder='Alias de direccion'
        disabled={props.isLoading} value={alias} setValue={setAlias} required={true} />
      <GenericTextInput id='state' type='text' placeholder='Estado'
        disabled={props.isLoading} value={state} setValue={setState} required={true} />
      <GenericTextInput id='city' type='text' placeholder='Ciudad'
        disabled={props.isLoading} value={city} setValue={setCity} required={true} />
      <GenericTextInput id='street' type='text' placeholder='Nombre de la calle'
        disabled={props.isLoading} value={street} setValue={setStreet} required={true} />
      <GenericTextInput id='extNumber' type='text' placeholder='Numero exterior'
        disabled={props.isLoading} value={extNumber} setValue={setExtNumber} required={true} />
      <GenericTextInput id='intNumber' type='text' placeholder='Numero interior'
        disabled={props.isLoading} value={intNumber} setValue={setIntNumber} />
      <GenericTextInput id='zipCode' type='tel' placeholder='Codigo postal'
        disabled={props.isLoading} value={zipCode} setValue={setZipCode} required={true} />
      <GenericTextInput id='receptorName' type='text' placeholder='Nombre del receptor'
        disabled={props.isLoading} value={receptorName} setValue={setReceptorName} />
      <GenericTextInput id='phone' type='tel' placeholder='Telefono de contacto'
        disabled={props.isLoading} value={phone} setValue={setPhone} />
      <GenericTextInput id='reference' type='text' placeholder='Referencia'
        disabled={props.isLoading} value={reference} setValue={setReference} />
      <GenericTextInput id='deliveryInstructions' type='text' placeholder='Instrucciones de entrega'
        disabled={props.isLoading} value={deliveryInstructions} setValue={setDeliveryInstructions} />
      <div className='col s12'>
        <p>Tipo de direccion</p>
        <div className='UserAddress__address-type '>
          <MenuOptionItem icon='house' value='house' name='Casa'
            addressType={addressType} setAddressType={setAddressType} />
          <MenuOptionItem icon='location_city' value='apartment' name='Departamento'
            addressType={addressType} setAddressType={setAddressType} />
          <MenuOptionItem icon='work' value='work' name='Trabajo'
            addressType={addressType} setAddressType={setAddressType} />
          <MenuOptionItem icon='markunread_mailbox' value='mail_box' name='Buzon'
            addressType={addressType} setAddressType={setAddressType} />
        </div>
        <HorizontalSpace size='xx-small' />
      </div>
      <div className='input-field col s12'>
        <input id='submit' type='submit'
          value='Guardar'
          className={`waves-effect waves-light btn right cyan ${props.isLoading ? 'disabled' : ''}`}
          disabled={props.isLoading} />
        <div className={`waves-effect waves-light btn right cyan UserAddress__cancel-button ${props.isLoading ? 'disabled' : ''}`}
            onClick={() => {
            props.setEditing(!props.editing);
          }}>Cancelar</div>
      </div>
      <div className={`progress col s12 ${ props.isLoading ? '' : 'hide' }`}>
        <div className='indeterminate'></div>
        <HorizontalSpace size='x-small' />
      </div>
    </form>
    </>
  );
};

export default EditUserAddress;
