import React, {
  useState
} from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/modules/footer/footer';
import StandDataLoader from 'src/modules/stand/stand-data-loader';
import SystemConfigurationLoader from 'src/modules/system-configuration-loader/system-configuration-loader';
import BusinessCard from 'src/modules/business-card/business-card';

const StandCardBusiness = (): React.ReactElement => {
  const params: any = useParams();
  const stand = useSelector((state: any) => state.stand);
  const [sectionMenu, setSectionMenu]: any = useState([]);

  return (
    <>
      <NavBar sectionMenu={sectionMenu} />
      <StandDataLoader setSectionMenu={setSectionMenu} />
      {
        stand && stand[params.standId] && stand[params.standId].id ?
          <BusinessCard stand={stand[params.standId]} /> : null
      }
      <Footer />
      <SystemConfigurationLoader basic={true} />
      <SystemCheck />
    </>
  );
};

export default StandCardBusiness;
