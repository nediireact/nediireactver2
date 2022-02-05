import React from 'react';
import StandItem from 'src/modules/stand-grid/stand-item';

const StandGrid = ( props: any ): React.ReactElement => {
  return (
    <div className='container row'>
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
  );
};

export default StandGrid;
