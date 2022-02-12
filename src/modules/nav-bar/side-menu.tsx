import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MenuItems from 'src/modules/nav-bar/menu-items';

const SideMenu = ( props: any ): React.ReactElement => {
  const userData = useSelector((state: any) => state.user);
  const user = userData && userData.user && userData.user.attributes ?
    userData.user.attributes : {};
  const profile = userData && userData.userProfile && userData.userProfile.attributes ?
    userData.userProfile.attributes : {};

  return (
    <ul
      className='sidenav white Menu'
      id='mobile-demo'
      ref={props.sideNavRef}
      onClick={props.closeSideNav}>
      <div
        className={`SideNavBar__logo ${
          user.username ? 'SideNavBar__logo--signed-user-background' : ''
        }`}
        style={{
          backgroundImage: `url(${props.logo})`
        }}>
        {
          user.username ?
          <>
            <div
              className='SideNavBar__signed-user-background'
              style={{
                backgroundImage: `url(${props.logo})`
              }}></div>
            <Link
              to='/mi-cuenta'
              className='SideNavBar__signed-user-button'>
              <i className='z-depth-1' style={{
                backgroundImage: `url(${profile.img_picture ? profile.img_picture : ''})`
                }}></i>
              <span className='grey-text text-darken-3 truncate'>
                {user.first_name} {user.last_name}
              </span>
            </Link>
            <a
              className='SideNavBar__logout'
              onClick={props.logout}>
              <i className='material-icons  z-depth-1'>exit_to_app</i>
              <span className='grey-text text-darken-3'>Cerrar sesion</span>
            </a>
          </> : null
        }
      </div>
      <MenuItems
        sectionMenu={props.sectionMenu}
        logo={props.logo}
        logout={props.logout} />
    </ul>
  );
};

export default SideMenu;
