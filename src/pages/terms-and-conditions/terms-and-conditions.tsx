import React, {
  useState
} from 'react';
import SystemCheck from 'src/components/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import DefaultNavButtons from 'src/modules/nav-bar/default-nav-buttons';
import Footer from 'src/components/footer/footer';
import { CommonDocument } from 'rrmc';
import SystemConfigurationLoader from 'src/components/system-configuration-loader/system-configuration-loader';

export const TermsAndConditions = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);

  return (
    <div className='page'>
      <NavBar sectionMenu={sectionMenu} />
      <DefaultNavButtons setSectionMenu={setSectionMenu} />
      <CommonDocument
        title='Terminos y condiciones'
        attr_key='terms_and_conditions' />
      <Footer />
      <SystemConfigurationLoader terms_and_conditions={true} />
      <SystemCheck />
    </div>
  );
};

export const PrivacyPolicy = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);

  return (
    <>
      <NavBar sectionMenu={sectionMenu} />
      <DefaultNavButtons setSectionMenu={setSectionMenu} />
      <CommonDocument
        title='Politica de privacidad'
        attr_key='privacy_policy' />
      <Footer />
      <SystemConfigurationLoader privacy_policy={true} />
      <SystemCheck />
    </>
  );
};

export const UserData = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);

  return (
    <>
      <NavBar sectionMenu={sectionMenu} />
      <DefaultNavButtons setSectionMenu={setSectionMenu} />
      <CommonDocument
        title='Politica de datos de usuario'
        attr_key='user_data' />
      <Footer />
      <SystemConfigurationLoader user_data={true} />
      <SystemCheck />
    </>
  );
};
