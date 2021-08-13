import React from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/modules/footer/footer';
import GroupDetailComponent from 'src/modules/group-detail/group-detail';

const GroupDetail = (): React.ReactElement => {
  return (
    <>
      <NavBar />
      <GroupDetailComponent />
      <Footer />
      <SystemCheck />
    </>
  );
};

export default GroupDetail;
