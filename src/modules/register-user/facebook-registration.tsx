import React, {
  useState,
  useRef
} from 'react';
import EnvironmentVariables from 'src/constants/EnvironmentVariables';
import FacebookLogin from 'react-facebook-login'; // https://www.npmjs.com/package/react-facebook-login
import RegisterUserAPICall from 'src/modules/register-user/register-user-api-calls';
import { APIGet } from 'src/api/communicator';
import Title from 'src/modules/title/title';
import Modal from 'src/modules/modal/modal';
import { ArrayErrorsToHTMLList } from 'src/modules/utils/date-parser';

const env = EnvironmentVariables.getInstance();
const facebookAppID = env.facebookAppID;
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

const FacebookRegistration = ( porps: any ): React.ReactElement => {
  const [modal, setModal] = useState(modelInterface);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModaMessage] = useState('');
  const [facebookImageURL, setFacebookImageURL] = useState('');
  const facebookImageRef = useRef(null);

  const FacebookCB = (response: any) => {
    porps.setIsLoading(true);
    const accessToken = response.accessToken;
    const userID = response.userID;
    if ( !userID || !accessToken ) return porps.setIsLoading(false);
    console.log('>>>>>>>> FacebookCB', response);
    const name = response.name ? response.name.split(' ') : [];
    newUserPayload.data.attributes.first_name = name.length && name[0] ? name[0] : '';
    newUserPayload.data.attributes.last_name = name.length && name[1] ? name[1] : '';
    newUserPayload.data.attributes.email = response.email;
    newUserPayload.data.attributes.username = `SN-${response.email}`;
    newUserPayload.data.attributes.password = userID;
    const url = `https://graph.facebook.com/v11.0/${userID}/picture?type=large&redirect=false&access_token=${accessToken}`;
    // return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    APIGet( url, false )
      .then((picture: any) => {
        setFacebookImageURL(picture.data.url);
        const img: any = facebookImageRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx: any = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        newUserPayload.data.attributes.img_picture = canvas.toDataURL('image/png') || '';
        RegisterUserAPICall(newUserPayload, true)
          .then((response: any) => {
            console.log('>>>>>>>> RegisterUserAPICall response', response);
            porps.setIsLoading(false);
            setModalSuccess(true);
            setModalTitle('Cuenta creada');
            setModaMessage(`<b>${newUserPayload.data.attributes.first_name}</b>, su cuenta de Nedii ha sido creada exitosamente.<br/><br/>
              Usted sera loggeado automaticamente.`);
            modal.open();
          })
          .catch((error: any) => {
            porps.setIsLoading(false);
            setModalSuccess(false);
            setModalTitle('Error');
            if ( !error.response ) {
              setModaMessage(`<b>${newUserPayload.data.attributes.first_name}</b>, ha sucedido un error creando su cuenta de Nedii.<br/><br/>Errores:<ol><li>Error enviando informacion al servidor</li></ol>
              Por favor contacte al equipo tecnico de Nedii mencionando el codigo: <b>"Error de conexion con el servidor"</b>.`);
              return modal.open();
            }
            const errorMessages = ArrayErrorsToHTMLList(error.response.data.errors);
            setModaMessage(`<b>${newUserPayload.data.attributes.first_name}</b>, ha sucedido un error creando su cuenta de Nedii.<br/><br/>Errores:<ol>${errorMessages}</ol>
              Si esta seguro de que los datos son correctos, por favor contacte al equipo tecnico de Nedii mencionando el codigo: <b>"${error.response.statusText} - ${error.response.status}"</b>.`);
            modal.open();
          });
      })
      .catch((error) => {
        console.log('>>>>>>>>> Picture error', error);
        porps.setIsLoading(false);
      });
  };

  return (
    <>
      <div className='col s12'><Title text='Registro con redes sociales' /></div>
      <Modal setModal={setModal} success={modalSuccess} title={modalTitle} message={modalMessage} />
      <div className='RegisterUser__social-login col s12 row'>
        <img src={facebookImageURL} width='10' height='10' ref={facebookImageRef} className='hide' />
        <FacebookLogin appId={facebookAppID} autoLoad={false} callback={FacebookCB}
          fields='name,email,picture' scope='public_profile,email'
          icon='fa-facebook' textButton='Login' />
      </div>
    </>
  );
};

export default FacebookRegistration;
