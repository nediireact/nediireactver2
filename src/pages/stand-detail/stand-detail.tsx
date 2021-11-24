import React, { useState } from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/modules/footer/footer';
import StandComponent from 'src/modules/stand/stand';

const StandDetail = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu] = useState([]);
  return (
    <>
      <NavBar sectionMenu={sectionMenu} />
      <StandComponent setSectionMenu={setSectionMenu} />
      <Footer />
      <SystemCheck />
    </>
  );
};

export default StandDetail;
