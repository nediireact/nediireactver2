import React, {
  useState
} from 'react';
import { useSelector } from 'react-redux';
import 'src/modules/user-account-configurations/user-account-configurations.scss';
import GenericTextInput from 'src/modules/form-components/generic-text-input';
import GenericCheckboxInput from 'src/modules/form-components/generic-checkbox-input';
import GenericTextArea from 'src/modules/form-components/generic-text-area';
import SubTitle from 'src/modules/sub-title/sub-title';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import APISDK from 'src/api/api-sdk/api-sdk';
import NediiPlans from 'src/modules/nedii-plans/nedii-plans';

const AccountForm = (props: any): React.ReactElement => {
  const userData = useSelector((state: any) => state.user);
  const user = userData && userData.user && userData.user.id ? userData.user : null;
  const profile = userData && userData.userProfile && userData.userProfile.id ? userData.userProfile : null;
  if ( !user || !user.attributes || !profile || !profile.attributes ) return <></>;
  const imgProfile = profile.attributes.img_picture ? profile.attributes.img_picture : '';
  const [email, setEmail] = useState(user.attributes.email);
  const [firstName, setFirstName] = useState(user.attributes.first_name);
  const [lastName, setLastName] = useState(user.attributes.last_name);
  const [userImage, setUserImage] = useState(imgProfile);
  const [ownerPosition, setOwnerPosition] = useState(profile.attributes.owner_position);
  const [ownerPhone, setOwnerPhone] = useState(profile.attributes.owner_phone);
  const [ownerEmail, setOwnerEmail] = useState(profile.attributes.owner_email);
  const [ownerOfficePhone, setOwnerOfficePhone] = useState(profile.attributes.owner_office_phone);
  const [ownerWhatsApp, setOwnerWhatsApp] = useState(profile.attributes.owner_whatsapp);
  const [ownerAddress, setOwnerAddress] = useState(profile.attributes.owner_address);
  const [newsletter, setNewsletter] = useState(profile.attributes.newsletter);
  const [promotions, setPromotions] = useState(profile.attributes.promotions);
  const [biography, setBiography] = useState(profile.attributes.biography);
  const [ownerPositionDescription, setOwnerPositionDescription] = useState(profile.attributes.owner_position_description);

  const updateUserData = (e: any) => {
    e.preventDefault();
    const data: any = {
      user: {
        email: email
      },
      userProfile: {}
    };
    if ( firstName ) data.user.first_name = firstName;
    if ( lastName ) data.user.last_name = lastName;
    if ( userImage.search(/base64/g) >= 0 ) data.userProfile.img_picture = userImage;
    if ( ownerPosition ) data.userProfile.owner_position = ownerPosition;
    if ( ownerPhone ) data.userProfile.owner_phone = ownerPhone;
    if ( ownerEmail ) data.userProfile.owner_email = ownerEmail;
    if ( ownerOfficePhone ) data.userProfile.owner_office_phone = ownerOfficePhone;
    if ( ownerWhatsApp ) data.userProfile.owner_whatsapp = ownerWhatsApp;
    if ( ownerAddress ) data.userProfile.owner_address = ownerAddress;
    data.userProfile.newsletter = newsletter;
    data.userProfile.promotions = promotions;
    if ( biography ) data.userProfile.biography = biography;
    if ( ownerPositionDescription ) data.userProfile.owner_position_description = ownerPositionDescription;
    props.updateUserData(data);
  };

  return (
    <form onSubmit={updateUserData} ref={props.formRef} className='row UserAccountConfigurations__form'>
      <div className='input-field col s12 m6 UserAccountConfigurations__input'>
        <div className='UserAccountConfigurations__user-image-wrapper'>
          <div className='UserAccountConfigurations__user-image z-depth-1'
            style={{ backgroundImage: `url(${userImage})` }}></div>
          <div className='UserAccountConfigurations__user-image-input-wrapper white z-depth-1'>
            <i className='material-icons UserAccountConfigurations__user-image-input-icon grey-text text-darken-3'>add_a_photo</i>
            <input type='file' id='user-image' onChange={(e: any) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (e: any) => {
                  setUserImage(e.target.result);
                };
                reader.readAsDataURL(file);
              }} accept='image/*' className='UserAccountConfigurations__user-image-input' />
          </div>
          <label htmlFor='user-image' className='hide'>-</label>
        </div>
      </div>
      <GenericTextInput id='firstName' type='text' placeholder='Nombre(s)'
        disabled={props.isLoading} value={firstName} setValue={setFirstName} />
      <GenericTextInput id='lastName' type='text' placeholder='Apellidos'
        disabled={props.isLoading} value={lastName} setValue={setLastName} />
      <GenericTextInput id='email' type='email' placeholder='Correo electronico'
        disabled={true} value={email} setValue={setEmail} />
      <GenericCheckboxInput id='newsletter' placeholder='News letter'
        checked={newsletter} setValue={setNewsletter} />
      <GenericCheckboxInput id='promotions' placeholder='Promociones'
        checked={promotions} setValue={setPromotions} />
      {
        profile.attributes.is_seller ?
          <>
            <div className='col s12'>
              <HorizontalSpace size='small' />
              <SubTitle
                text='Informacion de expositor'
                fullWidth={true}
                align='left' />
            </div>
            <GenericTextInput id='ownerPosition' type='text' placeholder='Posicion del expositor'
              disabled={props.isLoading} value={ownerPosition} setValue={setOwnerPosition} />
            <GenericTextInput id='ownerPhone' type='tel' placeholder='Telefono del expositor'
              disabled={props.isLoading} value={ownerPhone} setValue={setOwnerPhone} />
            <GenericTextInput id='ownerEmail' type='email' placeholder='Email del expositor'
              disabled={props.isLoading} value={ownerEmail} setValue={setOwnerEmail} />
            <GenericTextInput id='ownerOfficePhone' type='tel' placeholder='Tel. de oficina del expositor'
              disabled={props.isLoading} value={ownerOfficePhone} setValue={setOwnerOfficePhone} />
            <GenericTextInput id='ownerWhatsApp' type='tel' placeholder='WhatsApp del expositor'
              disabled={props.isLoading} value={ownerWhatsApp} setValue={setOwnerWhatsApp} />
            <GenericTextInput id='ownerAddress' type='text' placeholder='Direccion del expositor'
              disabled={props.isLoading} value={ownerAddress} setValue={setOwnerAddress} />
            <GenericTextArea id='ownerAddress' placeholder='Biografia del expositor'
              disabled={props.isLoading} value={biography} setValue={setBiography} />
            <GenericTextArea id='ownerAddress' placeholder='Descripcion del puesto del expositor'
              disabled={props.isLoading} value={ownerPositionDescription} setValue={setOwnerPositionDescription} />
          </> : null
      }
      <div className='input-field col s12 UserAccountConfigurations__input'>
        <HorizontalSpace size='small' />
        <input id='submit' type='submit'
          value='Guardar'
          className='waves-effect waves-light btn right'
          disabled={props.isLoading} />
      </div>
      <div className={`progress col s12 ${ props.isLoading ? '' : 'hide' }`}>
        <div className='indeterminate'></div>
      </div>
      {
        !profile.attributes.is_seller ?
          <div className='col s12'>
            <HorizontalSpace size='small' />
            <SubTitle
              text='Convertirse en expositor de Nedii'
              fullWidth={true}
              align='left' />
            <p>Ser expositor en Nedii es rapido y <b>gratis</b>, comienza ahora.</p>
            <a className='waves-effect waves-light btn' onClick={props.upgradeToSeller}>
              <i className='material-icons left'>business_center</i>Ser expositor
            </a>
          </div> :
          <div className='col s12'>
            <HorizontalSpace size='small' />
            <SubTitle
              text='Planes Nedii'
              fullWidth={true}
              align='left' />
            <p>Para continuar selecciones un Plan de Nedii.</p>
            <NediiPlans />
          </div>
      }
    </form>
  );
};

const UserAccountConfigurations = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);

  const updateUserData = (data: any) => {
    setIsLoading(true);
    APISDK.UpdateUser(data.user)
      .then((response: any) => {
        console.log(response);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        console.log(error);
      });
    APISDK.UpdateUserProfile(data.userProfile)
      .then((response: any) => {
        setIsLoading(false);
        console.log(response);
      })
      .catch((error: any) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const upgradeToSeller = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    APISDK.UpgradeUserToSeller()
      .then((response: any) => {
        setIsLoading(false);
        console.log(response);
      })
      .catch((error: any) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <div className='col s12 m8 UserAccountConfigurations'>
      <AccountForm
        updateUserData={updateUserData}
        upgradeToSeller={upgradeToSeller}
        isLoading={isLoading}
        setIsLoading={setIsLoading} />
    </div>
  );
};

export default UserAccountConfigurations;
