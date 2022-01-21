import React, {
  useState
} from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/modules/footer/footer';
import StandDataLoader from 'src/modules/stand/stand-data-loader';
import StandRealEstateGrid from 'src/modules/stand-real-estate-grid/stand-real-estate-grid';

const StandRealEstate = (): React.ReactElement => {
  const dispatch = useDispatch();
  const stand = useSelector((state: any) => state.stand);
  const [sectionMenu, setSectionMenu] = useState([]);

  return (
    <>
      <NavBar sectionMenu={sectionMenu} stand={stand} />
      <StandDataLoader
        setStand={dispatch}
        setSectionMenu={setSectionMenu} />
      {
        stand && stand.id ? <StandRealEstateGrid stand={stand} /> : null
      }
      <Footer />
      <SystemCheck />
    </>
  );
};

export default StandRealEstate;
