import React from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/modules/footer/footer';
import StandNewDetail from 'src/modules/stand-detail/news/stand-new-detail';

const StandNewsDetail = (): React.ReactElement => {
  return (
    <>
      <NavBar />
      <StandNewDetail/>
      <Footer />
      <SystemCheck />
    </>
  );
};

export default StandNewsDetail;
