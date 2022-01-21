import React from 'react';
import StandItem from 'src/modules/stand-grid/stand-item';
import 'src/modules/stand-grid/stand-grid.scss';

const StandGrid = ( props: any ): React.ReactElement => {
  return (
    <div className='container'>
      <div className='row'>
        {
          props.data.data.map((i: any, index: number) => {
            return (
              <StandItem
                key={index}
                item={i} />
            );
          })
        }
      </div>
    </div>
  );
};

export default StandGrid;
