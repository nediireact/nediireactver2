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
import StandProductDetail from 'src/modules/stand-product-detail/stand-product-detail';

const StanProductDetailPage = (): React.ReactElement => {
  const dispatch = useDispatch();
  const stand = useSelector((state: any) => state.stand);
  const [sectionMenu, setSectionMenu] = useState({});

  return (
    <>
      <NavBar sectionMenu={sectionMenu} />
      <StandDataLoader
        stand={stand}
        setStand={dispatch}
        setSectionMenu={setSectionMenu} />
      {
        stand && stand.id ?
          <StandProductDetail /> : null
      }
      <Footer />
      <SystemCheck />
    </>
  );
};

export default StanProductDetailPage;
