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
import StandRealEstateDetail from 'src/modules/stand-real-estate-detail/stand-real-estate-detail';

const StandRealEstateDetailPage = (): React.ReactElement => {
  const params: any = useParams();
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
        stand && stand[params.standId] && stand[params.standId].id ?
          <StandRealEstateDetail /> : null
      }
      <Footer />
      <SystemCheck />
    </>
  );
};

export default StandRealEstateDetailPage;
