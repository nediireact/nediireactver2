import React, {
  useRef
} from 'react';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';

const EmailFrom = ( props: any ): React.ReactElement => {
  const firstNameRef: any = useRef(null);
  const lastNameRef: any = useRef(null);
  const emailRef: any = useRef(null);
  const passwordRef: any = useRef(null);
  const passwordConfRef: any = useRef(null);

  const validForm = (): boolean => {
    if ( !props.firstName || !props.lastName ||
        !props.email || !props.password || !props.passwordConf ) {
      return false;
    }
    if ( props.password !== props.passwordConf ) return false;
    return true;
  };
  return (
    <form onSubmit={props.registerUser} ref={props.formRef}>
      <div className='RegisterUser__user-image'></div>
      <input type='file' name='file' onChange={(e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          props.setUserImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }}/>
      <div className='input-field col s12 m6'>
        <input id='first_name' type='text' className='validate'
          onChange={( e: any ) => props.setFirstName(e.target.value)}
          ref={firstNameRef} disabled={props.isLoading}/>
        <label htmlFor='first_name'>Nombre(s)</label>
      </div>
      <div className='input-field col s12 m6'>
        <input id='last_name' type='text' className='validate'
          onChange={( e: any ) => props.setLastName(e.target.value)}
          ref={lastNameRef} disabled={props.isLoading} />
        <label htmlFor='last_name'>Apellido(s)</label>
      </div>
      <div className='input-field col s12'>
        <input id='email' type='email' className='validate'
          onChange={( e: any ) => props.setEmail(e.target.value)}
          ref={emailRef} disabled={props.isLoading} />
        <label htmlFor='email'>Correo electronico</label>
      </div>
      <div className='input-field col s12 m6'>
        <input id='password' type='password' className='validate'
          onChange={( e: any ) => props.setPassword(e.target.value)}
          ref={passwordRef} disabled={props.isLoading} />
        <label htmlFor='password'>Contrasena</label>
      </div>
      <div className='input-field col s12 m6'>
        <input id='password-again' type='password' className='validate'
          onChange={( e: any ) => props.setPasswordConf(e.target.value)}
          ref={passwordConfRef} disabled={props.isLoading} />
        <label htmlFor='password-again'>Confirmar contrasena</label>
      </div>
      <div className='col s12'><HorizontalSpace size='small' /></div>
      <div className='col s12'>
        <div
          onClick={props.registerUser}
          className={`waves-effect waves-light btn cyan darken-1 right white-text ${!validForm() || props.isLoading ? 'disabled' : ''}`}>
          Crear cuenta
        </div>
        <div className='waves-effect waves-light btn blue left white-text'>
          Ir a login
        </div>
      </div>
      <div className={`col s12 ${ props.isLoading ? '' : 'hide' }`}><HorizontalSpace size='small' /></div>
      <div className={`progress col s12 ${ props.isLoading ? '' : 'hide' }`}>
        <div className='indeterminate'></div>
      </div>
    </form>
  );
};

export default EmailFrom;
