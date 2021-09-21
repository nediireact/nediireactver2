import React from 'react';
import StandComponentsQuestions from 'src/modules/stand-detail/stand-components/stand-components-questions';


const StandBookingQuestions = (props: any): React.ReactElement => {
  return (
    <div className='container'>
      <div className='col m1 hide-on-small-only'></div>
      <div className='col s12 m10'>
        <StandComponentsQuestions questions={props.questions}/>
      </div>
      <div className='col m1 hide-on-small-only'></div>
    </div>
  );
};

export default StandBookingQuestions;
