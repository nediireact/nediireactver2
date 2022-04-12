import React, {
  useState
} from 'react';
import { HorizontalSpace } from 'rrmc';
import SystemCheck from 'src/components/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import DefaultNavButtons from 'src/modules/nav-bar/default-nav-buttons';
import Footer from 'src/components/footer/footer';

const About = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);

  return (
    <div className='page'>
      <NavBar sectionMenu={sectionMenu} />
      <DefaultNavButtons setSectionMenu={setSectionMenu} />
      <HorizontalSpace size='medium' />
      About
      <HorizontalSpace size='large' />
      <Footer />
      <SystemCheck />
    </div>
  );
};

export default About;
