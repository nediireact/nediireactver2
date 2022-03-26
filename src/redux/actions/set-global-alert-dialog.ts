import {
  SET_GLOBAL_ALERT_DIALOG
} from 'src/constants/SystemConstants';
import GlobalAlertDialogsJSON from 'src/constants/global-alert-dialogs.json';

const SetGlobalAlertDialog = ( data: any ): any => {
  const j: any = { ...GlobalAlertDialogsJSON };
  const newState = data.active ? {
    active: data.active,
    success: j[data.dialog].success,
    title: j[data.dialog].title,
    message: j[data.dialog].message
  } : {
    active: data.active
  };
  return {
    type: SET_GLOBAL_ALERT_DIALOG,
    data: newState
  };
};

export default SetGlobalAlertDialog;
