import React, {
  FormEvent,
  useRef,
  useState
} from 'react';
import RegisterUserAPICall from 'src/modules/register-user/register-user-api-calls';
import EmailFrom from 'src/modules/register-user/email-from';
import Title from 'src/modules/title/title';
import Modal from 'src/modules/modal/modal';
import { ArrayErrorsToHTMLList } from 'src/modules/utils/date-parser';

const modelInterface = {
  open: () => null,
  close: () => null
};

const newUserPayload = {
  data: {
    type: 'User',
    attributes: {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      img_picture: ''
    }
  }
};

const EmailRegistration = ( porps: any ): React.ReactElement => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [userImage, setUserImage] = useState('');
  const formRef: any = useRef(null);
  const [modal, setModal] = useState(modelInterface);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModaMessage] = useState('');

  const registerUser = (e: FormEvent) => {
    e.preventDefault();
    porps.setIsLoading(true);
    newUserPayload.data.attributes.first_name = firstName;
    newUserPayload.data.attributes.last_name = lastName;
    newUserPayload.data.attributes.email = email;
    newUserPayload.data.attributes.username = email;
    newUserPayload.data.attributes.password = password;
    if ( userImage ) newUserPayload.data.attributes.img_picture = userImage.replace(/^data:image\/(png|jpg);base64,/, '');
    RegisterUserAPICall(newUserPayload, true)
      .then(() => {
        formRef.current.reset();
        porps.setIsLoading(false);
        setModalSuccess(true);
        setModalTitle('Cuenta creada');
        setModaMessage(`<b>${firstName}</b>, su cuenta de Nedii ha sido creada exitosamente.<br/><br/>
          Le hemos enviado un correo electronico a <b>${email}</b> para poder confirmar su identidad.<br/><br/>
          Por favor complete el registro siguiendo el enlace de activacion enviado a su correo, gracias.`);
        modal.open();
      })
      .catch((error: any) => {
        porps.setIsLoading(false);
        setModalSuccess(false);
        setModalTitle('Error');
        if ( !error.response ) {
          setModaMessage(`<b>${firstName}</b>, ha sucedido un error creando su cuenta de Nedii.<br/><br/>Errores:<ol><li>Error enviando informacion al servidor</li></ol>
          Por favor contacte al equipo tecnico de Nedii mencionando el codigo: <b>"Error de conexion con el servidor"</b>.`);
          return modal.open();
        }
        const errorMessages = ArrayErrorsToHTMLList(error.response.data.errors);
        console.log('>>>>>>>>> errorMessages', errorMessages);
        setModaMessage(`<b>${firstName}</b>, ha sucedido un error creando su cuenta de Nedii.<br/><br/>Errores:<ol>${errorMessages}</ol>
          Si esta seguro de que los datos son correctos, por favor contacte al equipo tecnico de Nedii mencionando el codigo: <b>"${error.response.statusText} - ${error.response.status}"</b>.`);
        modal.open();
      });
  };

  return (
    <>
      <div className='col s12'><Title text='Registro con correo' /></div>
      <Modal setModal={setModal} success={modalSuccess} title={modalTitle} message={modalMessage} />
      <EmailFrom formRef={formRef}
        firstName={firstName} setFirstName={setFirstName}
        lastName={lastName} setLastName={setLastName}
        email={email} setEmail={setEmail}
        password={password} setPassword={setPassword}
        passwordConf={passwordConf} setPasswordConf={setPasswordConf}
        userImage={userImage} setUserImage={setUserImage}
        registerUser={registerUser} isLoading={porps.isLoading} />
    </>
  );
};

export default EmailRegistration;
