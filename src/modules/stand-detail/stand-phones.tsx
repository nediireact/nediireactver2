import React from 'react';
import 'src/modules/stand-detail/stand-detail.scss';

const StandPhones = (props: any): React.ReactElement => {
  return (
    <div className='Stand__phones grey lighten-3'>
      <div className='Stand__phones-title'>{props.title}</div>
        <div className='row Stand__phones-container'>
        {
        props.phones.data.map((element: any, index: number) => {
          return (
            <div className='col s12 xl6 Stand__phones-item'
              key={index}>
                  <a
                  href={`tel:${element.attributes.phone}`}
                  target='_blank'
                  rel='noreferrer'
                  className='Stand__phones-number white'>
                    <i className='material-icons'>call</i>
                    <span className='grey-text text-darken-4'>{element.attributes.phone}</span>
                  </a>
            </div>
          );
        })
      }
      </div>
  </div>
  );
};

export default StandPhones;
