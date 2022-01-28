import React, {
  useState
} from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import DefaultNavButtons from 'src/modules/nav-bar/default-nav-buttons';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import Footer from 'src/modules/footer/footer';
import SlideAddons from 'src/modules/home-top-slider/home-top-slider';
import SystemConfigurationLoader from 'src/modules/system-configuration-loader/system-configuration-loader';

const Home = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);

  return (
    <>
      <NavBar sectionMenu={sectionMenu} />
      <DefaultNavButtons setSectionMenu={setSectionMenu} />
      <SlideAddons />
      <HorizontalSpace size='large' />
      Home
      <HorizontalSpace size='large' />
      <Footer />
      <SystemConfigurationLoader home={true} />
      <SystemCheck />
    </>
  );
};

export default Home;
