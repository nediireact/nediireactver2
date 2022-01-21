import React from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/modules/footer/footer';
import LoginUser from 'src/modules/login/login';

const Login = (): React.ReactElement => {
  return (
    <>
      <NavBar />
      <LoginUser />
      <Footer />
      <SystemCheck />
    </>
  );
};

export default Login;

