import React, {
  useState
} from 'react';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import EmailRegistration from 'src/modules/register-user/email-registration';
import FacebookRegistration from 'src/modules/register-user/facebook-registration';
import 'src/modules/register-user/register-user.scss';

const RegisterUser = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className='container row RegisterUser'>
      <div className='col m1 l2'></div>
      <div className='col s12 m10 l8 row'>
        <div className='col s12'><HorizontalSpace size='medium' /></div>
        <FacebookRegistration isLoading={isLoading} setIsLoading={setIsLoading} />
        <div className='col s12'><HorizontalSpace size='medium' /></div>
        <EmailRegistration isLoading={isLoading} setIsLoading={setIsLoading} />
      </div>
      <div className='col m1 l2'></div>
    </div>
  );
};

export default RegisterUser;
