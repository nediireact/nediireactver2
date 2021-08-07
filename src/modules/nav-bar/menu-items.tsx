import React from 'react';
import { Link } from 'react-router-dom';

const MenuItems = ( props: any ): React.ReactElement => {
  return (
    <>
      <li>
        <em
          className='SideNavBar__logo hide-on-large-only'style={{
          backgroundImage: `url(${props.logo})`
        }}></em>
      </li>
      <li>
        <Link
          to='/expos'
          className='grey-text text-darken-3'>
          Expos
        </Link>
      </li>
      <li>
        <Link
          to='/about'
          className='grey-text text-darken-3'>
          Acerca
        </Link>
      </li>
      <li>
        <Link
          to='/create-account'
          className='grey-text text-darken-3'>
          Mi cuenta
        </Link>
      </li>
    </>
  );
};

export default MenuItems;
