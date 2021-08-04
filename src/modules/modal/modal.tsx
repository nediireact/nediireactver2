import React, {
  useEffect,
  useRef
} from 'react';
import * as M from 'materialize-css';
import Title from 'src/modules/title/title';
import 'src/modules/modal/modal.scss';

const Modal = ( props: any ): React.ReactElement => {
  const modalRef: any = useRef(null);

  useEffect(() => {
    M.Modal.init(modalRef);
    props.setModal(M.Modal.getInstance(modalRef.current));
  });

  return (
    <>
      <div className='modal Modal' ref={modalRef}>
        <div className='modal-content'>
          <Title text={props.title} color={ props.success ? '#00acc1' : '#e53935' }/>
          <div dangerouslySetInnerHTML={{__html: props.message}}></div>
        </div>
        <div className='modal-footer'>
          <a href='#!' className='modal-close waves-effect waves cyan white-text btn'>Aceptar</a>
        </div>
      </div>
    </>
  );
};

export default Modal;
