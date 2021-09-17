import React from 'react';
import 'src/modules/stand-detail/stand-components/stand-survey-questions.scss';

const StandSurveyQuestion = (props: any): React.ReactElement => {
  return (
    <div className='StandSurveyQuestion container'>
      <div className='col m1 hide-on-small-only'></div>
      <div className="col12 m10">
        {
          props.survey.data.map((survey: any, index: number) => {
            return (
              <div className='StandSurveyQuestion__question' key={index}>
                <span>{survey.attributes.name}</span>
                <input type='text' className='StandSurveyQuestion__openAnswer' placeholder='Ingrese su respuesta' />
              </div>
            );
          })
        }
        <div className='StandSurveyQuestion__button center-align'>
          <input className='btn red white-text' type="submit" value='Enviar' />
        </div>
      </div>
      <div className='col m1 hide-on-small-only'></div>
    </div>
  );
};

export default StandSurveyQuestion;
