import React from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/modules/footer/footer';
import ExpoDetailComponent from 'src/modules/expo-detail/expo-detail';

const ExpoDetail = (): React.ReactElement => {
  return (
    <>
      <NavBar />
      <ExpoDetailComponent />
      <Footer />
      <SystemCheck />
    </>
  );
};

export default ExpoDetail;
