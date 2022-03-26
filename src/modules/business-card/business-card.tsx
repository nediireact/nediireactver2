import React, { useState } from 'react';
import 'src/modules/business-card/business-card.scss';
import ContactBusiness from 'src/modules/business-card/contact-business';
import {
  AboutUs,
  TheCompany,
  StarProducts
} from 'src/modules/business-card/sections-pages';

export const BusinessCardMenuItem = (props: any): React.ReactElement => {
  const select = props.select;
  const option = props.option;
  return (
    <div className='BusinessCard__select_icon center-align'>
      <div className={`BusinessCard__section_icon z-depth-1 hoverable  ${select === option ? 'BusinessCard__selected' : '' }`}>
        <i className='material-icons'>{props.icon}</i>
        <div className='BusinessCard__section_icon__text'>{props.text}</div>
      </div>
    </div>
  );
};

const BusinessCard = (props: any): React.ReactElement => {
  const [select, setSelected] = useState('nosotros');
  const stand = props.stand;
  return (
    <div>
      <div className='container BusinessCard'>
        <div className='row BusinessCard__section grey-text'>
          <div className='col s12 m4' onClick={() => {
            setSelected('nosotros');
              }}>
                <BusinessCardMenuItem
                  text='Nosotros'
                  icon='supervisor_account'
                  select={select}
                  option='nosotros' />
          </div>
          <div className='col s12 m4' onClick={() => {
            setSelected('empresa');
              }}>
                <BusinessCardMenuItem
                text='La Empresa'
                icon='store'
                select={select}
                option='empresa' />
          </div>
          <div className='col s12 m4' onClick={() => {
            setSelected('productos');
              }}>
                <BusinessCardMenuItem
                  text='Productos estrella'
                  icon='star'
                  select={select}
                  option='productos' />
          </div>
        </div>
        <ContactBusiness stand={stand}/>
      </div>
      <div className='container'>
        <div className='row'>
          {
            select === 'nosotros' ?
              <AboutUs stand={stand} /> : null
          }
          {
            select === 'empresa' ?
              <TheCompany stand={stand} /> : null
          }
          {
            select === 'productos' ?
              <StarProducts stand={stand} /> : null
          }
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
