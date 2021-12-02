import React, {
  useState
} from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/modules/footer/footer';
import StandDataLoader from 'src/modules/stand/stand-data-loader';
import standData from 'src/modules/stand/stand-data';
import StandProductsGrid from 'src/modules/stand-products-grid/stand-products-grid';

const StandProducts = (): React.ReactElement => {
  const [stand, setStand] = useState(standData);
  const [sectionMenu, setSectionMenu] = useState([]);

  return (
    <>
      <NavBar sectionMenu={sectionMenu} stand={stand} />
      <StandDataLoader
        setStand={setStand}
        setSectionMenu={setSectionMenu} />
      {
        stand && stand.id ?
          <StandProductsGrid
            standId={stand.id}
            standSlug={stand.attributes.slug} /> : null
      }
      <Footer />
      <SystemCheck />
    </>
  );
};

export default StandProducts;
