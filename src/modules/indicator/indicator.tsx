import React from 'react';
import 'src/modules/indicator/indicator.scss';

const Indicator = (): React.ReactElement => {
  return (
    <div>
      <div className='IndicatorMovil white-text red hide-on-med-and-up'>
        <div className='IndicatorMovil__icon'>
          <i className='material-icons left'>laptop_windows</i>
        </div>
        <div className='IndicatorMovil__text'>Expo virtual</div>
      </div>
      <div className='IndicatorDeskop white-text red hide-on-small-only'>
          <div className='IndicatorDeskop__icon'>
            <i className='material-icons'>laptop_windows</i>
          </div>
          <div className='IndicatorDeskop__text'>Expo virtual</div>
      </div>
    </div>
  );
};

export default Indicator;
