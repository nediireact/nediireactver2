import React from 'react';
import 'src/modules/form-components/form-components.scss';

const GenericCheckboxInput = (props: any): React.ReactElement => {
  return (
    <div className='input-field col s6 m4 GenericCheckboxInput'>
      <label htmlFor={props.id}>
        <input
          id={props.id}
          type='checkbox'
          className='filled-in'
          onChange={( e: any ) => {
            props.setValue(e.target.checked);
          }}
          defaultChecked={props.checked} />
        <span className='grey-text text-darken-3 truncate GenericCheckboxInput__placeholder'>
          {props.placeholder}
        </span>
      </label>
    </div>
  );
};

export default GenericCheckboxInput;
