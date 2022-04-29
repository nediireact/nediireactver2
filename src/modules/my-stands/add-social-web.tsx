import React, {
  useRef,
  useState
} from 'react';
import {
  GenericTextInput
} from 'rrmc';
import APISDK from 'src/api/api-sdk/api-sdk';


const AddSocialWeb = (props: any): React.ReactElement => {
  const stand: any = props.stand;
  const formRef: any = useRef(null);
  const [linkedinWeb, setlinkedinWeb] = useState(' ');
  let cLikedinURL = '';
  if (stand && stand.attributes && stand.attributes.linkedin_link) {
    cLikedinURL = stand.attributes.linkedin_link;
  }
  const addSocialWebInfo = (e: any) => {
    e.preventDefault();
    if (props.isLoading) return null;
    props.setIsLoading(true);
    const data = {
      id: stand.id,
      linkedin_link: linkedinWeb
    };
    APISDK.UpdateStand(data)
      .then((response: any) => {
        console.log('Response', response);
        props.setIsLoading(false);
      })
      .catch((error: any) => {
        console.log('Error', error);
        props.setIsLoading(false);
      });
  };

  return (
    <>
      Id de Stand: {stand.id}
      <form onSubmit={addSocialWebInfo} ref={formRef}>
        <GenericTextInput id='linkedinWeb' type='text' placeholder='Ingresar sitio Linkedin'
          disabled={props.isLoading} value={cLikedinURL} setValue={setlinkedinWeb} />

        <div className='input-field col s12'>
          <input id='submit' type='submit'
            value='Guardar'
            className={`waves-effect waves-light btn right cyan ${ props.isLoading ? 'disabled' : ''}`}
            disabled={props.isLoading} />
       </div>
      </form>
    </>
  );
};

export default AddSocialWeb;
