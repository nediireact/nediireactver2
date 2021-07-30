import React from 'react';
import { Link } from 'react-router-dom';

const CategoriesMenu = ( props: any ): React.ReactElement => {
  return (
    <>
      <li>
        <em
          className='SideNavBar__logo hide-on-large-only'style={{
          backgroundImage: `url(${props.logo})`
        }}></em>
      </li>
      {
        props.items ?
        props.items.map((item: any, index: any) => {
          if ( !item.attributes ) return null;
          return (
            <li key={index}>
              <Link
                to={`/${item.attributes.slug}`}
                className='grey-text text-darken-3'>
                {item.attributes.name}
              </Link>
            </li>
          );
        }) : null
      }
      <li>
        <Link
          to='/acerca'
          className='grey-text text-darken-3'>
          Acerca
        </Link>
      </li>
    </>
  );
};

export default CategoriesMenu;
