import React from 'react';
import { useSelector } from 'react-redux';
import APISDK from 'src/api/api-sdk/api-sdk';
import './stand-item.scss';

const MyStandItem = (props: any): React.ReactElement => {
  const system = useSelector((state: any) => state.system);
  const prefix = system.platform.prefix;
  const addStandImgURL = `${prefix}/assets/add-stand.png`;
  const item: any = props.item;
  const stand: any = props.stand ? props.stand : null;

  const deleteStand = () => {
    if ( props.isLoading || !item || !item.id ) return;
    props.setIsLoading(true);
    console.log('stand.id', item);
    APISDK.DeleteStandById(item.id)
      .then(() => {
        return APISDK.GetUserStands();
      })
      .then(() => {
        props.setIsLoading(false);
      })
      .catch((error: any) => {
        props.setIsLoading(false);
        console.log(error);
      });
  };

  if ( !item || !item.id || !item.attributes ) {
    return (
      <div className='col s6 m3 MyStandItem'>
        <div className={`MyStandItem__wrapper ${
          props.valueReference && props.valueReference === 'add-stand' ?
          'ItemSelected' : 'z-depth-1'
        }`}>
          <div
            className='MyStandItem__image MyStandItem__image--add'
            style={{
              backgroundImage: `url(${addStandImgURL}`
            }} onClick={() => {
              props.setValueReference('add-stand');
              props.setStand(null);
            }}></div>
          <div className='MyStandItem__name truncate'>
            Agregar empresa
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='col s6 m3 MyStandItem'>
      <div className={`MyStandItem__wrapper ${stand && stand.id === item.id ? 'ItemSelected' : 'z-depth-1'}`}>
        <div
          className='MyStandItem__image'
          style={{
            backgroundImage: `url(${item.attributes.img_logo}`
          }}>
          {
            !props.isLoading ?
            <>
              <i
              className='material-icons left white blue-text MyStandItem__button'
              onClick={(e: any) => {
                e.preventDefault();
                props.setValueReference('step-1');
                props.setStand(item);
              }}>create</i>
              <i
              className='material-icons right white red-text MyStandItem__button'
              onClick={(e: any) => {
                e.preventDefault();
                deleteStand();
              }}>delete</i>
            </> : null
          }
        </div>
        <div className='MyStandItem__name truncate'>
          {props.item.attributes.name}
        </div>
      </div>
    </div>
  );
};

export default MyStandItem;
