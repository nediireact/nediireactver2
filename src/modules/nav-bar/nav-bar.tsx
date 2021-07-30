import React, {
  useRef,
  useEffect
} from 'react';
import { Link } from 'react-router-dom';
import * as M from 'materialize-css';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import 'src/modules/nav-bar/nav-bar.scss';
import fetchData from 'src/modules/utils/fetch-data';
import setCategoryData from 'src/redux/actions/category-actions';
import SideMenu from 'src/modules/nav-bar/side-menu';
import CategoriesMenu from 'src/modules/nav-bar/categories-menu';

const categoriesURL = 'expos?sort=-order&page[size]=5';
const logoFile = '/assets/logo.jpg';

const NavBar = (): React.ReactElement => {
  const dispatch = useDispatch();
  const categories = useSelector((state: any) => state.categories);
  const system = useSelector((state: any) => state.system);
  const prefix = system.platform.prefix;
  const logoURL = `${prefix}${logoFile}`;
  const sideNavRef: any = useRef(null);

  const closeSideNav = () => {
    const sideNav = M.Sidenav.getInstance(sideNavRef.current);
    sideNav.close();
  };

  useEffect(() => {
    M.Sidenav.init(sideNavRef.current, {
      edge: 'left'
    });
    fetchData(categoriesURL)
      .then((d: any) => {
        if ( d ) dispatch(setCategoryData(d));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [fetchData]);

  return (
    <>
      <div className='navbar-fixed'>
        <nav className='white black-text'>
          <div className='nav-wrapper container'>
            <Link
              to='/'
              className='brand-logo Logo'
              style={{
                backgroundImage: `url(${logoURL})`
              }}>
            </Link>
            <a href='#'
              data-target='mobile-demo'
              className='sidenav-trigger cyan-text'>
              <i className='material-icons'>menu</i>
            </a>
            <ul id='nav-mobile' className='right hide-on-med-and-down'>
              <CategoriesMenu items={categories.data}/>
            </ul>
          </div>
        </nav>
      </div>
      <SideMenu
        sideNavRef={sideNavRef}
        closeSideNav={closeSideNav}
        categories={categories}
        logo={logoURL} />
    </>
  );
};

export default NavBar;
