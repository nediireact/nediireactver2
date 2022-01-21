import React from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/modules/footer/footer';
import ExpoGrid from 'src/modules/expo-grid/expo-grid';

const Expos = (): React.ReactElement => {
  return (
    <>
      <NavBar />
      <ExpoGrid />
      <Footer />
      <SystemCheck />
    </>
  );
};

export default Expos;
