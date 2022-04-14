import React, {
  useState,
  useEffect
} from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import { Modal } from 'rrmc';
import SetGlobalAlertDialog from 'src/redux/actions/set-global-alert-dialog';

const GlobalAlertDialog = (): React.ReactElement => {
  const system = useSelector((state: any) => state.system);
  const dispatch = useDispatch();
  const modelInterface = {
    open: () => null,
    close: () => null
  };
  const [modal, setModal] = useState(modelInterface);
  const onCloseEnd = () => {
    dispatch(SetGlobalAlertDialog({
      active: false
    }));
    modal.close();
  };

  useEffect(() => {
    modal.open();
  }, [modal]);

  return (
    <>
    {
      system && system.globalAlert && system.globalAlert.active ?
        <Modal
          setModal={setModal}
          success={system.globalAlert.success}
          title={system.globalAlert.title}
          message={system.globalAlert.message}
          onCloseEnd={onCloseEnd}
          size='small' /> : null
    }
    </>
  );
};

export default GlobalAlertDialog;
