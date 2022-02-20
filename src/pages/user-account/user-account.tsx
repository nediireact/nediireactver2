import React, {
  useState
} from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import DefaultNavButtons from 'src/modules/nav-bar/default-nav-buttons';
import Footer from 'src/modules/footer/footer';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import UserAccountMenu from 'src/modules/user-account-menu/user-account-menu';
import UserDashboard from 'src/modules/user-dashboard/user-dashboard';
import UserFavorites from 'src/modules/user-favorites/user-favorites';
import UserCart from 'src/modules/user-cart/user-cart';

const UserAccountPage = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);
  const pathname = window.location.pathname || '';

  return (
    <>
      <NavBar sectionMenu={sectionMenu} />
      <DefaultNavButtons setSectionMenu={setSectionMenu} />
      <HorizontalSpace size='medium' />
      <div className='container row UserAccount'>
        <UserAccountMenu />
        <div className='col s12 m1 hide-on-med-and-down'></div>
        { pathname === '/mi-cuenta' ? <UserDashboard /> : null }
        { pathname === '/mi-cuenta/favoritos' ? <UserFavorites /> : null }
        { pathname === '/mi-cuenta/carrito' ? <UserCart /> : null }
      </div>
      <Footer />
      <SystemCheck />
    </>
  );
};

export default UserAccountPage;
