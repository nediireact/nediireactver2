import React, {
  useEffect,
  useState
} from 'react';
import { HorizontalSpace } from 'rrmc';
import { useParams } from 'react-router-dom';
import SystemCheck from 'src/components/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import ActivateUserCall from 'src/pages/activate-user/activate-user-call';
import Footer from 'src/components/footer/footer';

const ActivateUser = (): React.ReactElement => {
  const params: any = useParams();
  const [status, setStatus] = useState({
    success: false,
    message: ''
  });
  const token = params.token || null;

  useEffect(() => {
    ActivateUserCall( token )
      .then((data: any) => {
        setStatus({
          success: data.success,
          message: 'Cuenta activada exitosamente'
        });
      })
      .catch(() => {
        setStatus({
          success: false,
          message: 'Error activando la cuenta'
        });
      });
  }, [ActivateUserCall]);

  return (
    <div className='page'>
      <NavBar />
      <HorizontalSpace size='large' />
      <p>{ status.success ? 'Cuenta activada correctamente' : status.message }</p>
      <Footer />
      <SystemCheck />
    </div>
  );
};

export default ActivateUser;
