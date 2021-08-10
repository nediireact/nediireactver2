import React from 'react';
import Title from 'src/modules/title/title';

const ExpoHead = (props: any): React.ReactElement => {
  return (
    <div className='container ExpoHead'>
      <div className='row'>
        <div className='col s1 hide-on-small-only'></div>
        <div className='ExpoHead col s12 m10'>
          <Title
            text={props.title}
            align='left'
            fullWidth={true}/>
        </div>
        <div className='col s1 hide-on-small-only'></div>
      </div>
      <div className='row'>
        <div className='col s1 hide-on-small-only'></div>
        <a
          className='ExpoHead__email col s12 m10'
          href={`mailto:${props.email}`}
          rel='noreferrer'
          target='_blank'
          >Email: {props.email}</a>
        <div className='col s1 hide-on-small-only'></div>
      </div>
    </div>
  );
};

export default ExpoHead;
