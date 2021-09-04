import React from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/modules/footer/footer';

const StandNewsDetail = (): React.ReactElement => {
  return (
    <>
      <NavBar />
      <Footer />
      <SystemCheck />
    </>
  );
};

export default StandNewsDetail;
