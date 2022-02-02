import React, {
  useState
} from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import DefaultNavButtons from 'src/modules/nav-bar/default-nav-buttons';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import Footer from 'src/modules/footer/footer';
import HomeTopSlider from 'src/modules/home-top-slider/home-top-slider';
import SystemConfigurationLoader from 'src/modules/system-configuration-loader/system-configuration-loader';
import HomeCategorySlider from 'src/modules/home-category-slider/home-category-slider';
import HomeProductAndServices from 'src/modules/home-products-and-services/home-products-and-services';
import HomeExpoGrid from 'src/modules/home-expos-grid/home-expos-grid';
import HomeStandsGrid from 'src/modules/home-stands-grid/home-stands-grid';

const Home = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);

  return (
    <>
      <NavBar sectionMenu={sectionMenu} />
      <DefaultNavButtons setSectionMenu={setSectionMenu} />
      <HomeTopSlider />
      <HomeCategorySlider />
      <HomeExpoGrid />
      <HomeStandsGrid />
      <HomeProductAndServices />
      <HomeStandsGrid onlyRestaurants={true} />
      <HorizontalSpace size='large' />
      <Footer />
      <SystemConfigurationLoader home={true} />
      <SystemCheck />
    </>
  );
};

export default Home;
