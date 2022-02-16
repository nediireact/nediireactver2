import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import StrongText from 'src/modules/strong-text/strong-text';
import 'src/modules/user-account-menu/user-account-menu.scss';
import MenuItemsJSON from 'src/modules/user-account-menu/menu-items.json';
import SellerMenuItemsJSON from 'src/modules/user-account-menu/seller-menu-items.json';

const AccountMenuItem = (props: any): React.ReactElement => {
  const pathname = window.location.pathname || '';

  return (
    <li>
      <Link to={props.item.path}
        className={`UserAccount__menu-item UserAccount__menu-item${pathname === props.item.path ? '--selected' : ''}`}>
        {props.item.text}
      </Link>
    </li>
  );
};

const UserAccountMenu = (): React.ReactElement => {
  const userData = useSelector((state: any) => state.user);
  const user = userData && userData.user && userData.user.attributes ?
    userData.user.attributes : {};
  const profile = userData && userData.userProfile && userData.userProfile.attributes ?
    userData.userProfile.attributes : {};

  return (
    <div className='col s12 m3'>
      <div
        className='UserAccount__profile-image z-depth-2'
        style={{
          backgroundImage: `url(${profile.img_picture})`
        }}></div>
      <StrongText
        text={`Hola ${user.first_name} ${user.last_name}`}
        fullWidth={true} />
      <ul className='UserAccount__list'>
        {
          MenuItemsJSON.map((i: any, index: number) => {
            return <AccountMenuItem key={index} item={i} />;
          })
        }
      </ul>
      <ul className='UserAccount__list'>
        {
          SellerMenuItemsJSON.map((i: any, index: number) => {
            return <AccountMenuItem key={index} item={i} />;
          })
        }
      </ul>
    </div>
  );
};

export default UserAccountMenu;
