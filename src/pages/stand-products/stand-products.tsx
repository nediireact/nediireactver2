import React, {
  useState
} from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/modules/footer/footer';
import StandDataLoader from 'src/modules/stand/stand-data-loader';
import StandProductsGrid from 'src/modules/stand-products-grid/stand-products-grid';

const StandProducts = (): React.ReactElement => {
  const dispatch = useDispatch();
  const stand = useSelector((state: any) => state.stand);
  const [sectionMenu, setSectionMenu] = useState([]);

  return (
    <>
      <NavBar sectionMenu={sectionMenu} stand={stand} />
      <StandDataLoader
        setStand={dispatch}
        setSectionMenu={setSectionMenu} />
      {
        stand && stand.id ? <StandProductsGrid stand={stand} /> : null
      }
      <Footer />
      <SystemCheck />
    </>
  );
};

export default StandProducts;
