// DEPRECATED

import React, {
  useState
} from 'react';
// import EnvironmentVariables from 'src/constants/EnvironmentVariables';
// import FacebookLogin from 'react-facebook-login'; // https://www.npmjs.com/package/react-facebook-login
import LoginUserAPICall from 'src/modules/login/login-user-api-calls';
import {
  SubTitle,
  ArrayErrorsToHTMLList,
  Modal
} from 'rrmc';
import { SetUserData } from 'src/redux/actions/user-actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// const env = EnvironmentVariables.getInstance();
// const facebookAppID = env.facebookAppID;
const modelInterface = {
  open: () => null,
  close: () => null
};

const loginPayload = {
  data: {
    type: 'login',
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    img_picture: ''
  }
};

const FacebookLoginComponent = ( porps: any ): React.ReactElement => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(modelInterface);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModaMessage] = useState('');

  const onCloseEnd = () => {
    modal.close();
  };

  const FacebookCB = (response: any) => {
    porps.setIsLoading(true);
    const accessToken = response.accessToken;
    const userID = response.userID;
    if ( !userID || !accessToken || !response.email ) return porps.setIsLoading(false);
    const name = response.name ? response.name.split(' ') : [];
    loginPayload.data.first_name = name.length && name[0] ? name[0] : '';
    loginPayload.data.last_name = name.length && name[1] ? name[1] : '';
    loginPayload.data.email = response.email;
    loginPayload.data.username = `SN-${response.email}`;
    loginPayload.data.password = userID;
    LoginUserAPICall(loginPayload)
      .then((response) => {
        porps.setIsLoading(false);
        dispatch(SetUserData(response));
        return navigate('/');
      })
      .catch((error: any) => {
        porps.setIsLoading(false);
        setModalSuccess(false);
        setModalTitle('Error');
        if ( !error.response ) {
          setModaMessage(`Ha sucedido un error intentando acceder a su cuenta de Nedii.<br/><br/>Errores:<ol><li>Error enviando informacion al servidor</li></ol>
          Por favor contacte al equipo tecnico de Nedii mencionando el codigo: <b>"Error de conexion con el servidor"</b>.`);
          return modal.open();
        }
        const errorMessages = ArrayErrorsToHTMLList(error.response.data.errors);
        setModaMessage(`Ha sucedido un error intentando acceder a su cuenta de Nedii.<br/><br/>Errores:<ol>${errorMessages}</ol>
          Si esta seguro de que los datos son correctos, por favor contacte al equipo tecnico de Nedii mencionando el codigo: <b>"${error.response.statusText} - ${error.response.status}"</b>.`);
        modal.open();
      });
  };

  return (
    <>
      <div className='col s12'><SubTitle text='Login con redes sociales' /></div>
      <Modal setModal={setModal} success={modalSuccess} title={modalTitle} message={modalMessage} onCloseEnd={onCloseEnd} fixedFooter={true} />
      <div className='RegisterUser__social-login col s12 row' onClick={FacebookCB}>
        {/* <FacebookLogin appId={facebookAppID} autoLoad={false} callback={FacebookCB}
          fields='name,email,picture' scope='public_profile,email'
          icon='fa-facebook' textButton='Login' /> */}
      </div>
    </>
  );
};

export default FacebookLoginComponent;
