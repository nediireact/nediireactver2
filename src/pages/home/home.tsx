import React from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import Footer from 'src/modules/footer/footer';
import Expo from 'src/modules/expo/expo';
import Group from 'src/modules/group/group';

const Home = (): React.ReactElement => {
  return (
    <>
      <NavBar />
      <HorizontalSpace size='large' />
      <Expo/>
      <Group/>
      <Footer />
      <SystemCheck />
    </>
  );
};

export default Home;
