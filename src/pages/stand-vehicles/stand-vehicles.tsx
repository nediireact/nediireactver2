import React, {
  useState
} from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import { useParams } from 'react-router-dom';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/modules/footer/footer';
import StandDataLoader from 'src/modules/stand/stand-data-loader';
import StandVehiclesGrid from 'src/modules/stand-vehicles-grid/stand-vehicles-grid';

const StandVehicles = (): React.ReactElement => {
  const params: any = useParams();
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
        stand && stand[params.standId] && stand[params.standId].id ?
          <StandVehiclesGrid stand={stand[params.standId]} /> : null
      }
      <Footer />
      <SystemCheck />
    </>
  );
};

export default StandVehicles;
