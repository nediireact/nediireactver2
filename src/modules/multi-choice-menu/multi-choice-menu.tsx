import React from 'react';
import 'src/modules/multi-choice-menu/multi-choice-menu.scss';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';

const MenuChoiceMenu = (props: any): React.ReactElement => {
  return (
    <div className='MenuChoiceMenu'>
      <p>{props.title}</p>
      <HorizontalSpace size='xxx-small' />
      <div className='MenuChoiceMenu__wrapper'>
      {
        props.items.map((i: any, index: number) => {
          return (
            <div className='MenuChoiceMenu__item' key={index} onClick={() => {
              props.setValueReference(i.value);
            }}>
              <i className={`material-icons hoverable white-text ${
                props.valueReference === i.value ? 'cyan' : 'grey lighten-1'
              }`}>
                {i.icon}
              </i>
              <span className={props.valueReference === i.value ? 'cyan-text' : ''}>
                {i.name}
              </span>
            </div>
          );
        })
      }
      </div>
    </div>
  );
};

export default MenuChoiceMenu;
