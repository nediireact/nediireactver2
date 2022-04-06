import React, {
  useRef
} from 'react';
import { Link } from 'react-router-dom';
import * as M from 'materialize-css';
import { useSelector } from 'react-redux';
import 'src/modules/nav-bar/nav-bar.scss';
import SideMenu from 'src/modules/nav-bar/side-menu';
import MenuItems from 'src/modules/nav-bar/menu-items';
import { SetUserData } from 'src/redux/actions/user-actions';
import { useDispatch } from 'react-redux';
import NavSearchBox from 'src/modules/nav-search-box/nav-search-box';
import { useNavigate } from 'react-router-dom';

const logoFile = '/assets/logo.jpg';

const NavBar = (props: any): React.ReactElement => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const system = useSelector((state: any) => state.system);
  const prefix = system.platform.prefix;
  const logoURL = system && system.configurations &&
    system.configurations.id ?
    system.configurations.attributes.img_logo : `${prefix}${logoFile}`;
  const sideNavRef: any = useRef(null);
  const sectionMenu = props.sectionMenu || [];

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
      <div className='navbar-fixed'>
        <nav className='NavBar white black-text'>
          <div className='nav-wrapper container'>
            <Link to='/' className='brand-logo left Logo'
              style={{
                backgroundImage: `url(${logoURL})`
              }}>
            </Link>
            <NavSearchBox updateQuery={props.updateQuery} />
            <a href='#'
              data-target='mobile-demo'
              className='sidenav-trigger cyan-text right'>
              <i className='material-icons'>menu</i>
            </a>
            <ul
              id='nav-mobile'
              className='right hide-on-med-and-down Menu'>
              <MenuItems
                logout={logout}
                sectionMenu={sectionMenu} />
            </ul>
          </div>
        </nav>
      </div>
      <SideMenu
        sideNavRef={sideNavRef}
        closeSideNav={closeSideNav}
        logout={logout}
        sectionMenu={sectionMenu}
        logo={logoURL} />
    </>
  );
};

export default NavBar;
