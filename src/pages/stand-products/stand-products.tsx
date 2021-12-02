import React, {
  useState
} from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/modules/footer/footer';
import StandDataLoader from 'src/modules/stand/stand-data-loader';

const StandProducts = (): React.ReactElement => {
  const [stand, setStand] = useState({});
  const [sectionMenu, setSectionMenu] = useState([]);

  return (
    <>
      <NavBar sectionMenu={sectionMenu} stand={stand} />
      <StandDataLoader
        setStand={setStand}
        setSectionMenu={setSectionMenu} />
      Hola mundo StandProducts
      <Footer />
      <SystemCheck />
    </>
  );
};

export default StandProducts;
