import React from 'react';
import 'src/modules/form-components/form-components.scss';

const GenericTextInput = (props: any): React.ReactElement => {
  return (
    <div className='input-field col s12 m6 GenericTextInput'>
      <input
        id={props.id}
        type={props.type}
        disabled={props.disabled}
        onChange={( e: any ) => props.setValue(e.target.value)}
        defaultValue={props.value}
        placeholder={props.placeholder}
        required={props.required} />
      <span className='cyan-text GenericTextInput__placeholder'>
        {props.placeholder}
      </span>
      <label htmlFor={props.id} className='hide'>-</label>
    </div>
  );
};

export default GenericTextInput;
