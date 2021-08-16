import React from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/modules/footer/footer';
import StandDetailComponent from 'src/modules/stand-detail/stand-detail';

const StandDetail = (): React.ReactElement => {
  return (
    <>
      <NavBar />
      <StandDetailComponent />
      <Footer />
      <SystemCheck />
    </>
  );
};

export default StandDetail;
