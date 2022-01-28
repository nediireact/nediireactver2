import React, {
  useState
} from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import DefaultNavButtons from 'src/modules/nav-bar/default-nav-buttons';
import Footer from 'src/modules/footer/footer';
import ChangeLog from 'src/modules/changelog/changelog';

const ChangeLogPage = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);

  return (
    <>
      <NavBar sectionMenu={sectionMenu} />
      <DefaultNavButtons setSectionMenu={setSectionMenu} />
      <ChangeLog />
      <Footer />
      <SystemCheck />
    </>
  );
};

export default ChangeLogPage;
