import React, { useState } from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/modules/footer/footer';
import StandDataLoader from 'src/modules/stand/stand-data-loader';
import standData from 'src/modules/stand/stand-data';
import StandComponent from 'src/modules/stand/stand';

const StandDetail = (): React.ReactElement => {
  const [stand, setStand] = useState(standData);
  const [sectionMenu, setSectionMenu] = useState([]);

  return (
    <>
      <NavBar sectionMenu={sectionMenu} />
      <StandDataLoader
        setStand={setStand}
        setSectionMenu={setSectionMenu} />
      <StandComponent stand={stand} />
      <Footer />
      <SystemCheck />
    </>
  );
};

export default StandDetail;
