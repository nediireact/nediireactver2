import React from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import Footer from 'src/modules/footer/footer';

const ExpoDetail = (): React.ReactElement => {
  return (
    <>
      <NavBar />
      <HorizontalSpace size='large' />
      Expo Detail
      <Footer />
      <SystemCheck />
    </>
  );
};

export default ExpoDetail;
