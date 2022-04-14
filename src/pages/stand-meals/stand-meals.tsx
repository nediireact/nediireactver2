import React, {
  useState
} from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SystemCheck from 'src/components/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/components/footer/footer';
import StandDataLoader from 'src/modules/stand/stand-data-loader';
import StandMealsGrid from 'src/modules/stand-meals-grid/stand-meals-grid';

const StandMeals = (): React.ReactElement => {
  const params: any = useParams();
  const stand = useSelector((state: any) => state.stand);
  const [sectionMenu, setSectionMenu] = useState([]);

  return (
    <div className='page'>
      <NavBar sectionMenu={sectionMenu} />
      <StandDataLoader setSectionMenu={setSectionMenu} />
      {
        stand && stand[params.standId] && stand[params.standId].id ?
          <StandMealsGrid stand={stand[params.standId]} /> : null
      }
      <Footer />
      <SystemCheck />
    </div>
  );
};

export default StandMeals;
