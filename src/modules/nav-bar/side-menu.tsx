import React from 'react';
import CategoriesMenu from 'src/modules/nav-bar/categories-menu';

const SideMenu = ( props: any ): React.ReactElement => {
  return (
    <ul
      className='sidenav white'
      id='mobile-demo'
      ref={props.sideNavRef}
      onClick={props.closeSideNav}>
      <CategoriesMenu
        items={props.categories.data}
        logo={props.logo}/>
    </ul>
  );
};

export default SideMenu;
