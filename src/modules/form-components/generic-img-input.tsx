import React from 'react';
import 'src/modules/form-components/form-components.scss';

const GenericImgInput = (props: any): React.ReactElement => {
  return (
    <div className='file-field input-field col s12 m6 GenericImgInput'>
      <div className='btn cyan'>
        <i className='material-icons'>cloud_upload</i>
        <input
          id={props.id}
          type='file'
          accept='image/*'
          disabled={props.disabled}onChange={(e: any) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e: any) => {
              props.setValue(e.target.result);
            };
            reader.readAsDataURL(file);
          }}
          defaultValue={props.value}
          placeholder={props.placeholder}
          required={props.required} />
        <label htmlFor={props.id} className='hide'>-</label>
      </div>
      <div className='file-path-wrapper'>
        <input id='file-path-wrapper' className='file-path validate' type='text' />
        <label htmlFor='file-path-wrapper' className='hide'>-</label>
      </div>
      <span className='cyan-text GenericImgInput__placeholder'>
        {props.placeholder}
      </span>
    </div>
  );
};

export default GenericImgInput;
