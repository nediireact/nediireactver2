import React, {
  useState
} from 'react';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import EmailLogin from 'src/modules/login/email-login';
import FacebookLoginComponent from 'src/modules/login/facebook-login';

const LoginUser = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className='container row LoginUser'>
      <div className='col m1 l2'></div>
      <div className='col s12 m10 l8 row'>
        <div className='col s12'><HorizontalSpace size='medium' /></div>
        <FacebookLoginComponent isLoading={isLoading} setIsLoading={setIsLoading} />
        <div className='col s12'><HorizontalSpace size='medium' /></div>
        <EmailLogin isLoading={isLoading} setIsLoading={setIsLoading} />
      </div>
      <div className='col m1 l2'></div>
    </div>
  );
};

export default LoginUser;
