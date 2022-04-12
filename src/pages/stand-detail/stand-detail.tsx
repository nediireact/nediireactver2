import React, {
  useState
} from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SystemCheck from 'src/components/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/components/footer/footer';
import StandDataLoader from 'src/modules/stand/stand-data-loader';
import StandComponent from 'src/modules/stand/stand';
import SystemConfigurationLoader from 'src/components/system-configuration-loader/system-configuration-loader';

const StandDetail = (): React.ReactElement => {
  const params: any = useParams();
  const stand = useSelector((state: any) => state.stand);
  const [sectionMenu, setSectionMenu]: any = useState([]);

  return (
    <div className='page'>
      <NavBar sectionMenu={sectionMenu} />
      <StandDataLoader setSectionMenu={setSectionMenu} />
      {
        stand && stand[params.standId] && stand[params.standId].id ?
          <StandComponent stand={stand[params.standId]} /> : null
      }
      <Footer />
      <SystemConfigurationLoader basic={true} />
      <SystemCheck />
    </div>
  );
};

export default StandDetail;
