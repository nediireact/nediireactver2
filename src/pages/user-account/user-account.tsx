import React, {
  useState,
  useEffect
} from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import { HorizontalSpace } from 'rrmc';
import SystemCheck from 'src/components/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import DefaultNavButtons from 'src/modules/nav-bar/default-nav-buttons';
import Footer from 'src/components/footer/footer';
import SetGlobalAlertDialog from 'src/redux/actions/set-global-alert-dialog';
import UserAccountMenu from 'src/modules/user-account-menu/user-account-menu';
import UserDashboard from 'src/modules/user-dashboard/user-dashboard';
import UserFavorites from 'src/modules/user-favorites/user-favorites';
import UserCart from 'src/modules/user-cart/user-cart';
import UserAccountConfigurations from 'src/modules/user-account-configurations/user-account-configurations';
import UserAddress from 'src/modules/user-address/user-address';
import MyStands from 'src/modules/my-stands/my-stands';
import MyProducts from 'src/modules/my-products/my-products';
import MyServices from 'src/modules/my-services/my-services';
import MyMeals from 'src/modules/my-meals/my-meals';
import MyVehicles from 'src/modules/my-vehicles/my-vehicles';
import MyRealEstates from 'src/modules/my-real-estates/my-real-estates';

const UserAccountPage = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user);
  const user = userData && userData.user && userData.user.id ? userData.user : null;
  const pathname = window.location.pathname || '';

  useEffect(() => {
    if ( !user || !user.id ) {
      dispatch(SetGlobalAlertDialog({
        active: true,
        dialog: 'missingLogin'
      }));
    }
  });

  return (
    <>
    {
      !user || !user.id ?
      <div className='page'>
        <NavBar sectionMenu={sectionMenu} />
        <DefaultNavButtons setSectionMenu={setSectionMenu} />
        <HorizontalSpace size='medium' />
        Por favor inicie sesion
        <HorizontalSpace size='medium' />
        <Footer />
        <SystemCheck />
      </div> :
      <div className='page'>
        <NavBar sectionMenu={sectionMenu} />
        <DefaultNavButtons setSectionMenu={setSectionMenu} />
        <HorizontalSpace size='medium' />
        <div className='container row UserAccount'>
          <UserAccountMenu />
          <div className='col s12 m1 hide-on-med-and-down'></div>
          { pathname === '/mi-cuenta' ? <UserDashboard /> : null }
          { pathname === '/mi-cuenta/favoritos' ? <UserFavorites /> : null }
          { pathname === '/mi-cuenta/carrito' ? <UserCart /> : null }
          { pathname === '/mi-cuenta/configuracion' ? <UserAccountConfigurations /> : null }
          { pathname === '/mi-cuenta/direcciones' ? <UserAddress /> : null }
          { pathname === '/mi-cuenta/empresas' ? <MyStands /> : null }
          { pathname === '/mi-cuenta/productos' ? <MyProducts /> : null }
          { pathname === '/mi-cuenta/servicios' ? <MyServices /> : null }
          { pathname === '/mi-cuenta/platillos' ? <MyMeals /> : null }
          { pathname === '/mi-cuenta/vehiculos' ? <MyVehicles /> : null }
          { pathname === '/mi-cuenta/inmuebles' ? <MyRealEstates /> : null }
        </div>
        <Footer />
        <SystemCheck />
      </div>
    }
    </>
  );
};

export default UserAccountPage;
