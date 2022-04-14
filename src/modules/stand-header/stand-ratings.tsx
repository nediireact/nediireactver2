import React, {
  useState
} from 'react';
import {
  useDispatch
} from 'react-redux';
import {
  APIPost
} from 'src/api/communicator';
import {
  Modal,
  Ratings
} from 'rrmc';
import UpdateStandAverageRating from 'src/redux/actions/update-stand-average-rating';

const StandRatings = (props: any): React.ReactElement => {
  const dispatch = useDispatch();

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
    const ratingPayload = {
      data: {
        type: 'post-rating',
        attributes: {
            rating: e
        },
        relationships: {
          stand: {
            data: {
              id: props.standId
            }
          }
        }
      }
    };
    APIPost('post-rating/', ratingPayload, true)
      .then((response: any) => {
        const rating = Number(response.data.attributes.rating);
        const average_rating = Number(response.data.attributes.average_rating);
        setModalSuccess(true);
        setModalTitle('Puntuaciones');
        setModaMessage(`Usted ha puntuado el stand con <b>${rating}</b> estrella${rating === 1 ? '' : 's'}.<br/><br/>Gracias.`);
        modal.open();
        dispatch(UpdateStandAverageRating({
          standSlug: props.standSlug,
          rating: average_rating
        }));
      })
      .catch((error: any) => {
        console.log('error', error);
      });
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
        score={props.averageRating}
        size='xxx-large'
        onClick={starCB}
        tooltip={`Promedio: ${props.averageRating}`} />
    </>
  );
};

export default StandRatings;
