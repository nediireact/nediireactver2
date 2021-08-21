import React from 'react';
import 'src/modules/stand-detail/stand-detail.scss';

const StandPhones = (props: any): React.ReactElement => {
  return (
    <div className='Stand__phones grey lighten-3'>
      <div className='Stand__phones-title'>{props.title}</div>
      {
        props.phones.data.map((element: any, index: number) => {
          return (
            <div
              className='Stand__phones-item white'
              key={index}>
              <a
                href={`tel:${element.attributes.phone}`}
                target='_blank'
                rel='noreferrer'>
                  <i className='material-icons left'>call</i>
                  <span className='grey-text text-darken-4'>{element.attributes.phone}</span>
              </a>
            </div>
          );
        })
      }
  </div>
  );
};

export default StandPhones;
