import React from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/modules/footer/footer';
import ExpoDetailItem from 'src/modules/expo-detail/expo-detail';

const ExpoDetail = (): React.ReactElement => {
  return (
    <>
      <NavBar />
      <ExpoDetailItem/>
      <Footer />
      <SystemCheck />
    </>
  );
};

export default ExpoDetail;
