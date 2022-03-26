import React, {
  useEffect,
  useRef
} from 'react';
import * as M from 'materialize-css';
import SubTitle from 'src/modules/sub-title/sub-title';
import 'src/modules/modal/modal.scss';

const Modal = ( props: any ): React.ReactElement => {
  const modalRef: any = useRef(null);

  useEffect(() => {
    const instance = M.Modal.init(modalRef.current, {
      opacity: 0.5,
      preventScrolling: false,
      onCloseEnd: props.onCloseEnd
    });
    props.setModal(instance);
  }, [M]);

  return (
    <>
      <div className={`modal ${props.fixedFooter ? 'modal-fixed-footer' : ''} Modal ${props.size ? `Modal--${props.size}` : ''}`} ref={modalRef}>
        <div className='modal-content'>
          <SubTitle
            text={props.title}
            color={ props.success ? '#00acc1' : '#e53935' } />
          <div
            className='black-text'
            dangerouslySetInnerHTML={{__html: props.message}}></div>
        </div>
        <div className='modal-footer'>
          <a onClick={props.onCloseEnd} className='modal-close waves-effect waves cyan white-text btn'>Aceptar</a>
        </div>
      </div>
    </>
  );
};

export default Modal;
