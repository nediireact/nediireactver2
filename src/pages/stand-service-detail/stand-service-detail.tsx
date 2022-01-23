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
import StandServicesDetail from 'src/modules/stand-services-detail/stand-services-detail';

const StandServiceDetailPage = (): React.ReactElement => {
  const dispatch = useDispatch();
  const stand = useSelector((state: any) => state.stand);
  const [sectionMenu, setSectionMenu] = useState([]);

  return (
    <>
      <NavBar sectionMenu={sectionMenu} />
      <StandDataLoader
        stand={stand}
        setStand={dispatch}
        setSectionMenu={setSectionMenu} />
      {
        stand && stand.id ?
          <StandServicesDetail /> : null
      }
      <Footer />
      <SystemCheck />
    </>
  );
};

export default StandServiceDetailPage;
