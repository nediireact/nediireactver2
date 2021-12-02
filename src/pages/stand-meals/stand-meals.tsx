import React, {
  useState
} from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/modules/footer/footer';
import StandDataLoader from 'src/modules/stand/stand-data-loader';
import standData from 'src/modules/stand/stand-data';
import StandMealsGrid from 'src/modules/stand-meals-grid/stand-meals-grid';

const StandMeals = (): React.ReactElement => {
  const [stand, setStand] = useState(standData);
  const [sectionMenu, setSectionMenu] = useState([]);

  return (
    <>
      <NavBar sectionMenu={sectionMenu} />
      <StandDataLoader
        stand={stand}
        setStand={setStand}
        setSectionMenu={setSectionMenu} />
      {
        stand && stand.id ?
          <StandMealsGrid
            standId={stand.id}
            standSlug={stand.attributes.slug} /> : null
      }
      <Footer />
      <SystemCheck />
    </>
  );
};

export default StandMeals;
