import React from 'react';
import { Link } from 'react-router-dom';

const ItemsNoSignedUser = () : React.ReactElement => {
  return (
    <>
      <li className='Menu__item-with-icon Menu__item-left-line Menu__item-with-sub-menu hide-on-med-and-down'>
        <a
          className='grey-text text-darken-3'>
          <i className='material-icons'>account_circle</i>
          <span>Cuenta</span>
        </a>
        <div className='Menu__sub-menu z-depth-2'>
          <Link
            to='/login'
            className='grey-text text-darken-3 Menu__item-with-icon'>
            <i className='material-icons'>vpn_key</i>
            <span>Login</span>
          </Link>
          <Link
            to='/create-account'
            className='grey-text text-darken-3 Menu__item-with-icon Menu__item-left-line'>
            <i className='material-icons'>add_circle_outline</i>
            <span>Crear cuenta</span>
          </Link>
        </div>
      </li>
      <div className='hide-on-large-only'>
        <li className='Menu__item-with-icon'>
          <Link
            to='/login'
            className='grey-text text-darken-3'>
            <i className='material-icons'>vpn_key</i>
            <span>Login</span>
          </Link>
        </li>
        <li className='Menu__item-with-icon'>
          <Link
            to='/create-account'
            className='grey-text text-darken-3'>
            <i className='material-icons'>add_circle_outline</i>
            <span>Crear cuenta</span>
          </Link>
        </li>
      </div>
    </>
  );
};

export default ItemsNoSignedUser;
