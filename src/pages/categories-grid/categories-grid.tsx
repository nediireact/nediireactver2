import React, {
  useState
} from 'react';
import SystemCheck from 'src/components/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import DefaultNavButtons from 'src/modules/nav-bar/default-nav-buttons';
import Footer from 'src/components/footer/footer';
import CategoriesGrid from 'src/modules/categories-grid/categories-grid';

const CategoriesGridPage = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);

  return (
    <div className='page'>
      <NavBar sectionMenu={sectionMenu} />
      <DefaultNavButtons setSectionMenu={setSectionMenu} />
      <CategoriesGrid />
      <Footer />
      <SystemCheck />
    </div>
  );
};

export default CategoriesGridPage;
