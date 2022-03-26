import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ItemsSignedUser from 'src/modules/nav-bar/menu-items-signed-user';
import ItemsNoSignedUser from 'src/modules/nav-bar/menu-items-no-signed-user';

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

  return (
    <>
      {
        props.sectionMenu ? <SectionMenu data={props.sectionMenu} /> : null
      }
      {
        userData && userData.user ?
          <ItemsSignedUser logout={props.logout}/> : <ItemsNoSignedUser />
      }
    </>
  );
};

export default MenuItems;
