import React from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/modules/footer/footer';

const StandMealDetail = (): React.ReactElement => {
  return (
    <>
      <NavBar />
      Stand Meal Detail - detalle de la comida
      <Footer />
      <SystemCheck />
    </>
  );
};

export default StandMealDetail;
