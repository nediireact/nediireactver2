import React, {
  useEffect
} from 'react';
import {
  useNavigate
} from 'react-router-dom';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import SystemValues, {
  FILE_PREFIX
} from 'src/constants/SystemValues';
import SetSystemData from 'src/redux/actions/system';
import * as M from 'materialize-css';

const systemValues = SystemValues.getInstance();
const isMobileApp = systemValues.isMobileApp;

const SystemCheck = (): React.ReactElement => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate: any = useNavigate();

  useEffect(() => {
    const w: any = window;
    M.AutoInit();
    w.scrollTo(0, 0);
    if ( isMobileApp ) {
      w.document.addEventListener('deviceready', () => {
        if ( w.device ) {
          const os: string = w.device.platform;
          let prefix = '';
          if ( os === 'Android' ) {
            prefix = FILE_PREFIX.ANDROID;
          }
          dispatch(SetSystemData({
            platform: {
              os: os,
              prefix: prefix
            }
          }));
        }
      });
    } else {
      const pathname = window.location.pathname || '';
      if ( ( pathname === '/login' ||
        pathname === '/create-account') &&
        user && user.jwt && user.jwt.access ) {
        navigate('/');
      }
    }
  }, [M, window]);

  return (
    <></>
  );
};

export default SystemCheck;
