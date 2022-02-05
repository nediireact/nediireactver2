import React, {
  useState
} from 'react';
import Ratings from 'src/modules/ratings/ratings';
import Modal from 'src/modules/modal/modal';

const StandRatings = (): React.ReactElement => {
  const modelInterface = {
    open: () => null,
    close: () => null
  };
  const [modal, setModal] = useState(modelInterface);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModaMessage] = useState('');

  const onCloseEnd = () => {
    modal.close();
  };

  const starCB = (e: any) => {
    setModalSuccess(true);
    setModalTitle('Puntuaciones');
    setModaMessage(`Usted ha puntuado el stand con <b>${e}</b> estrella${e === 1 ? '' : 's'}.<br/><br/>Gracias.`);
    modal.open();
  };

  return (
    <>
      <Modal
        setModal={setModal}
        success={modalSuccess}
        title={modalTitle}
        message={modalMessage}
        onCloseEnd={onCloseEnd} />
      <Ratings
        score={2}
        size='xxx-large'
        onClick={starCB}
        tooltip={`${666} reseña${false ? '' : 's'}`} />
    </>
  );
};

export default StandRatings;
