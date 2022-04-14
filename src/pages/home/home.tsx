import React, {
  useState
} from 'react';
import { HorizontalSpace } from 'rrmc';
import SystemCheck from 'src/components/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import DefaultNavButtons from 'src/modules/nav-bar/default-nav-buttons';
import Footer from 'src/components/footer/footer';
import HomeTopSlider from 'src/modules/home-top-slider/home-top-slider';
import SystemConfigurationLoader from 'src/components/system-configuration-loader/system-configuration-loader';
import HomeCategorySlider from 'src/modules/home-category-slider/home-category-slider';
import HomeProductAndServices from 'src/modules/home-products-and-services/home-products-and-services';
import HomeExpoGrid from 'src/modules/home-expos-grid/home-expos-grid';
import HomeStandsGrid from 'src/modules/home-stands-grid/home-stands-grid';
import HomeRestaurantsGrid from 'src/modules/home-restaurants-grid/home-restaurants-grid';
import HomeMealsGrid from 'src/modules/home-meals-grid/home-meals-grid';


const Home = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);

  return (
    <div className='page'>
      <NavBar sectionMenu={sectionMenu} />
      <DefaultNavButtons setSectionMenu={setSectionMenu} />
      <HomeTopSlider />
      <HomeCategorySlider />
      <HomeProductAndServices />
      <HomeExpoGrid />
      <HorizontalSpace size='large' />
      <HomeMealsGrid />
      <HomeStandsGrid />
      <HomeRestaurantsGrid />
      <HorizontalSpace size='large' />
      <Footer />
      <SystemConfigurationLoader home={true} />
      <SystemCheck />
    </div>
  );
};

export default Home;
