/* eslint-disable max-lines-per-function */
import React, {
  useRef
} from 'react';
import {
  Link,
  useNavigate
} from 'react-router-dom';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import * as M from 'materialize-css';
import SystemValues from 'src/constants/SystemValues';
import { SetUserData } from 'src/redux/actions/user-actions';
import NavSearchBox from 'src/components/_core/nav-search-box/nav-search-box';
import DefaultNavButtons from './default-nav-buttons';
import SideMenu from './side-menu';
import MenuItems from './menu-items';
import './nav-bar.scss';

interface NavBarInterface {
  sectionMenu: Array<any>;
  setSectionMenu: CallableFunction;
  updateQuery?: CallableFunction;
}

const NavBar = (props: NavBarInterface): React.ReactElement => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const systemValues = SystemValues.getInstance();
  const system = useSelector((state: any) => state.system);
  const prefix = system.platform.prefix;
  // const logoURL = system && system.configurations &&
  //   system.configurations.id ?
  //   system.configurations.attributes.img_logo : `${prefix}${logoFile}`;
  const logoFile = '/assets/logo.png';
  const logoURL = `${prefix}${logoFile}`;
  const sideNavRef: any = useRef(null);

  const closeSideNav = () => {
    const sideNav = M.Sidenav.getInstance(sideNavRef.current);
    sideNav.close();
  };

  const logout = (e: any) => {
    e.preventDefault();
    dispatch(SetUserData({
      jwt: null,
      user: null,
      userProfile: null,
      favoriteStands: [],
      favoriteItems: [],
      cart: [],
      userStands: []
    }));
    return navigate('/');
  };

  return (
    <>
      <DefaultNavButtons
        sectionMenu={props.sectionMenu}
        setSectionMenu={props.setSectionMenu} />
      <div className='navbar-fixed'>
        <nav className='NavBar white black-text'>
          <div className='nav-wrapper container'>
            <Link to='/' className='brand-logo left Logo'
              style={{
                backgroundImage: `url(${logoURL})`
              }}>
            </Link>
            {
              systemValues.searchAvailable ?
                <NavSearchBox updateQuery={props.updateQuery} /> : null
            }
            <a href='#'
              data-target='mobile-demo'
              className={`sidenav-trigger ${systemValues.primaryColorName}-text right`}>
              <i className='material-icons'>menu</i>
            </a>
            <ul
              id='nav-mobile'
              className='right hide-on-med-and-down Menu'>
              <MenuItems
                logout={logout}
                sectionMenu={props.sectionMenu} />
            </ul>
          </div>
        </nav>
      </div>
      <SideMenu
        sideNavRef={sideNavRef}
        closeSideNav={closeSideNav}
        logout={logout}
        sectionMenu={props.sectionMenu}
        logo={logoURL} />
    </>
  );
};

export default NavBar;
