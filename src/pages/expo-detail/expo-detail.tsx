import React, {
  useState
} from 'react';
import SystemCheck from 'src/components/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import DefaultNavButtons from 'src/modules/nav-bar/default-nav-buttons';
import Footer from 'src/components/footer/footer';
import ExpoDetailComponent from 'src/modules/expo-detail/expo-detail';

const ExpoDetail = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);

  return (
    <div className='page'>
      <NavBar sectionMenu={sectionMenu} />
      <DefaultNavButtons setSectionMenu={setSectionMenu} />
      <ExpoDetailComponent />
      <Footer />
      <SystemCheck />
    </div>
  );
};

export default ExpoDetail;
