import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ItemsSignedUser = ( props: any ): React.ReactElement => {
  const userData = useSelector((state: any) => state.user);
  const user = userData && userData.user && userData.user.attributes ?
    userData.user.attributes : {};
  const profile = userData && userData.userProfile && userData.userProfile.attributes ?
    userData.userProfile.attributes : {};

  return (
    <>
      <li className='Menu__item-with-icon Menu__item-left-line Menu__item-with-sub-menu hide-on-med-and-down'>
        <a
          className={'grey-text text-darken-3 hide-on-med-and-down'}>
          <i className='material-icons'
            style={{
              backgroundImage: `url(${ profile.img_picture ? profile.img_picture : '' })`
            }}>{ !profile.img_picture ? 'account_circle' : '' }</i>
          <span>{user.first_name}</span>
        </a>
        <div className='Menu__sub-menu z-depth-2'>
          <Link
            to='/mi-cuenta/ordenes'
            className='grey-text text-darken-3 Menu__item-with-icon'>
            <i className='material-icons'>history</i>
            <span>Ordenes</span>
          </Link>
          <Link
            to='/mi-cuenta/favoritos'
            className='grey-text text-darken-3 Menu__item-with-icon Menu__item-left-line'>
            <i className='material-icons'>favorite</i>
            <span>Favoritos</span>
          </Link>
          <Link
            to='/mi-cuenta/carrito'
            className='grey-text text-darken-3 Menu__item-with-icon Menu__item-left-line'>
            <i className='material-icons'>shopping_cart</i>
            <span>Carrito</span>
          </Link>
          <Link
            to='/mi-cuenta'
            className='grey-text text-darken-3 Menu__item-with-icon Menu__item-left-line'>
            <i className='material-icons'>account_circle</i>
            <span>Cuenta</span>
          </Link>
          <a
            className='grey-text text-darken-3 Menu__item-with-icon Menu__item-left-line'
            onClick={props.logout}>
            <i className='material-icons'>exit_to_app</i>
            <span>Cerrar sesion</span>
          </a>
        </div>
      </li>
      <div className='hide-on-large-only'>
        <li className='Menu__item-with-icon'>
          <Link
            to='/mi-cuenta/carrito'
            className='grey-text text-darken-3'>
            <i className='material-icons'>shopping_cart</i>
            <span>Carrito</span>
          </Link>
        </li>
        <li className='Menu__item-with-icon'>
          <Link
            to='/mi-cuenta/favoritos'
            className='grey-text text-darken-3'>
            <i className='material-icons'>favorite</i>
            <span>Favoritos</span>
          </Link>
        </li>
        <li className='Menu__item-with-icon'>
          <Link
            to='/mi-cuenta/ordenes'
            className='grey-text text-darken-3'>
            <i className='material-icons'>history</i>
            <span>Ordenes</span>
          </Link>
        </li>
      </div>
    </>
  );
};

export default ItemsSignedUser;
