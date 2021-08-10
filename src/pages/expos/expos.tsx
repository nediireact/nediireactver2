import React from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/modules/footer/footer';
import Expo from 'src/modules/expo/expo';

const Expos = (): React.ReactElement => {
  return (
    <>
      <NavBar />
      <Expo />
      <Footer />
      <SystemCheck />
    </>
  );
};

export default Expos;
