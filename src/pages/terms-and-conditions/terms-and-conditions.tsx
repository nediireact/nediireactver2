import React from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/modules/footer/footer';
import CommonDocument from 'src/modules/common-document/common-document';

export const TermsAndConditions = (): React.ReactElement => {
  return (
    <>
      <NavBar />
      <CommonDocument
        title='Terminos y condiciones'
        attr_key='terms_and_conditions' />
      <Footer />
      <SystemCheck />
    </>
  );
};

export const PrivacyPolicy = (): React.ReactElement => {
  return (
    <>
      <NavBar />
      <CommonDocument
        title='Politica de privacidad'
        attr_key='privacy_policy' />
      <Footer />
      <SystemCheck />
    </>
  );
};

export const UserData = (): React.ReactElement => {
  return (
    <>
      <NavBar />
      <CommonDocument
        title='Politica de datos de usuario'
        attr_key='user_data' />
      <Footer />
      <SystemCheck />
    </>
  );
};
