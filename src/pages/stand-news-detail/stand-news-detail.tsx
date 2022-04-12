import React from 'react';
import SystemCheck from 'src/components/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/components/footer/footer';
// import StandNewDetail from 'src/modules/stand-detail/news/stand-new-detail';

const StandNewsDetail = (): React.ReactElement => {
  return (
    <div className='page'>
      <NavBar />
      {/* <StandNewDetail/> */}
      <Footer />
      <SystemCheck />
    </div>
  );
};

export default StandNewsDetail;
