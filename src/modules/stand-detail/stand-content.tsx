import React from 'react';
import 'src/modules/stand-detail/stand-detail.scss';
import CommonLargeText from 'src/modules/stand-detail/stand-common-large-text';
import StandPhones from 'src/modules/stand-detail/stand-phones';

const StandContent = (props: any): React.ReactElement => {
  return (
    <div className='Stand'>
      <div className='container row'>
        <div className='col s12 m9 Stand__main-container'>
          <CommonLargeText text={props.stand.attributes.description} />
        </div>
        <div className='col s12 m3 grey lighten-3 Stand__aside'>
          <StandPhones
            title='Contacto'
            phones={props.stand.relationships.phones} />
        </div>
      </div>
    </div>
  );
};

export default StandContent;

