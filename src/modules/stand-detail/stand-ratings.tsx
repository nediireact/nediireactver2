import React, {
  useState
} from 'react';
import Ratings from 'src/modules/ratings/ratings';
import Modal from 'src/modules/modal/modal';

const modelInterface = {
  open: () => null,
  close: () => null
};


const StandRatings = (props: any): React.ReactElement => {
  const [modal, setModal] = useState(modelInterface);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModaMessage] = useState('');

  const onCloseEnd = () => {
    modal.close();
  };

  const ratings: any[] = props.ratings || [];
  let score = 0;
  if ( ratings.length > 1 ) {
    for (let i = 0; i < ratings.length; i++) {
      score += ratings[i].attributes.rating;
    }
    score = score / ratings.length;
  } else if ( ratings.length === 1 ) {
    score = ratings[0].attributes.rating;
  }

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
        score={score}
        size='xxx-large'
        onClick={starCB}
        tooltip={`${ratings.length} reseña${ratings.length === 1 ? '' : 's'}`} />
    </>
  );
};

export default StandRatings;
