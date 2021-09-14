import React from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/modules/footer/footer';
import StandMealsDetail from 'src/modules/stand-detail/meals/stand-meals-detail';

const StandMealDetail = (): React.ReactElement => {
  return (
    <>
      <NavBar />
      <StandMealsDetail/>
      <Footer />
      <SystemCheck />
    </>
  );
};

export default StandMealDetail;
