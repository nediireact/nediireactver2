import React, {
  useState
} from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SystemCheck from 'src/components/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/components/footer/footer';
import StandDataLoader from 'src/modules/stand/stand-data-loader';
import StandVehicleDetail from 'src/modules/stand-vehicle-detail/stand-vehicle-detail';

const StandVehicleDetailPage = (): React.ReactElement => {
  const params: any = useParams();
  const stand = useSelector((state: any) => state.stand);
  const [sectionMenu, setSectionMenu] = useState([]);

  return (
    <div className='page'>
      <NavBar sectionMenu={sectionMenu} />
      <StandDataLoader setSectionMenu={setSectionMenu} />
      {
        stand && stand[params.standId] && stand[params.standId].id ?
          <StandVehicleDetail /> : null
      }
      <Footer />
      <SystemCheck />
    </div>
  );
};

export default StandVehicleDetailPage;
