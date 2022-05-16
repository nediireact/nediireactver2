import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HorizontalSpace } from 'rrmc';
import './item-to-edit.scss';

const ItemToEdit = (props: any): React.ReactElement => {
  const system = useSelector((state: any) => state.system);
  const prefix = system.platform.prefix;
  const addItemImgURL = `${prefix}/assets/add-stand.png`;
  const item: any = props.item;

  if ( !props.id ) {
    return (
      <div className='col s6 m3 ItemToEdit'>
        <div className='ItemToEdit__wrapper z-depth-1'>
          <div
            className='ItemToEdit__image ItemToEdit__image--add'
            style={{
              backgroundImage: `url(${addItemImgURL}`
            }} onClick={() => {
              props.setValueReference('add-item');
              props.setItem(null);
            }}></div>
          <div className='ItemToEdit__name'>
            {props.addLabel}
          </div>
          <HorizontalSpace size='xx-small' />
        </div>
      </div>
    );
  }

  return (
    <div className='col s6 m3 ItemToEdit'>
      <div className='ItemToEdit__wrapper z-depth-1'>
        <div
          className='ItemToEdit__image'
          style={{
            backgroundImage: `url(${props.image}`
          }}>
        </div>
        <div className='ItemToEdit__name truncate'>
          {props.name}
        </div>
        <div className='ItemToEdit__action-buttons'>
          <i
            className={`material-icons white ${ props.isLoading ? 'blue-text text-lighten-4' : 'blue-text'} ItemToEdit__button`}
            onClick={(e: any) => {
              if ( props.isLoading ) return null;
              e.preventDefault();
              props.setValueReference('step-1');
              props.setItem(item);
            }}>create</i>
          <Link to={props.url}>
            <i className='material-icons white green-text ItemToEdit__button'>remove_red_eye</i>
          </Link>
          <i
            className={`material-icons white ${props.isLoading ? 'red-text text-lighten-4' : 'red-text'} ItemToEdit__button`}
            onClick={(e: any) => {
              if ( props.isLoading ) return null;
              e.preventDefault();
              props.deleteItem(props.id);
            }}>delete</i>
        </div>
      </div>
    </div>
  );
};

export default ItemToEdit;