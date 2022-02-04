import React from 'react';
import 'src/modules/strong-text/strong-text.scss';

const StrongText = (props: any): React.ReactElement => {
  return (
    <div className={`StrongText ${ props.fullWidth ? '' : 'row'}`}>
      {
        props.fullWidth ? null : <em className='col m2 l1 hide-on-small-only'></em>
      }
      <div className={`${ props.fullWidth ? '' : 'col s12 m8 l10'} StrongText__text truncate`}
        style={{
          color: props.color,
          textAlign: props.align ? props.align : 'center',
          textShadow: props.shadow ? '0px 0px 2px rgba(0, 0, 0, 0.6)' : ''
        }}>
        {props.text}
      </div>
      {
        props.fullWidth ? null : <em className='col m2 l1 hide-on-small-only'></em>
      }
    </div>
  );
};

export default StrongText;
