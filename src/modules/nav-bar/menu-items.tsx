import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SectionMenu = (props: any): React.ReactElement => {
  const data = props.data;
  if ( !data || !Array.isArray(data) ) return <></>;
  return (
    <>{
      data.map((i: any, index: number) => {
        if ( !i.to || !i.text ) return null;
        if ( i.icon ) {
          return <li key={index} className={`Menu__item-with-icon ${
                i.leftLine ? ' Menu__item-left-line' : ''
              } ${
                i.rightLine ? ' Menu__item-right-line' : ''
              }`}>
              <Link
                to={i.to}
                className='grey-text text-darken-3'>
                <i className='material-icons'>{i.icon}</i>
                <span>{i.text}</span>
              </Link>
            </li>;
        }
        return <li key={index} className={`${
              i.leftLine ? ' Menu__item-left-line' : ''
            } ${
              i.rightLine ? ' Menu__item-right-line' : ''
            }`}>
            <Link to={i.to} className='grey-text text-darken-3'>
              {i.text}
            </Link>
          </li>;
      })
    }</>
  );
};

const MenuItems = ( props: any ): React.ReactElement => {
  const userData = useSelector((state: any) => state.user);
  const user = userData && userData.user && userData.user.attributes ?
    userData.user.attributes : {};
  const profile = userData && userData.userProfile && userData.userProfile.attributes ?
    userData.userProfile.attributes : {};

  return (
    <>
      <li>
        <em
          className='SideNavBar__logo hide-on-large-only'style={{
          backgroundImage: `url(${props.logo})`
        }}></em>
      </li>
      {
        props.sectionMenu ? <SectionMenu data={props.sectionMenu} /> : null
      }
      {
        userData && userData.user ?
        <>
          <li className='Menu__item-with-icon Menu__item-left-line'>
            <Link
              to='/my-account'
              className={`grey-text text-darken-3 Menu__item-with-icon${profile.img_picture ? '--profile' : '' }`}>
              <i className='material-icons'
                style={{
                  backgroundImage: `url(${ profile.img_picture ? profile.img_picture : '' })`
                }}>{ !profile.img_picture ? 'account_circle' : '' }</i>
              <span>{user.first_name}</span>
            </Link>
          </li>
          <li className='Menu__item-with-icon'>
            <a
              className='grey-text text-darken-3 Menu__item-with-icon'
              onClick={props.logout}>
              <i className='material-icons'>exit_to_app</i>
              <span>Cerrar sesion</span>
            </a>
          </li>
        </> :
        <>
          <li className='Menu__item-with-icon Menu__item-left-line'>
            <Link
              to='/login'
              className='grey-text text-darken-3 Menu__item-with-icon'>
              <i className='material-icons'>account_circle</i>
              <span>Login</span>
            </Link>
          </li>
          <li className='Menu__item-with-icon'>
            <Link
              to='/create-account'
              className='grey-text text-darken-3 Menu__item-with-icon'>
              <i className='material-icons'>add_circle_outline</i>
              <span>Crear cuenta</span>
            </Link>
          </li>
        </>
      }
    </>
  );
};

export default MenuItems;
