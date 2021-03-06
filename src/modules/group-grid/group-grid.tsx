import React from 'react';
import GroupItem from 'src/modules/group-grid/group-item';
import 'src/modules/group-grid/group-grid.scss';

const GroupGrid = ( props: any ): React.ReactElement => {
  return (
    <div className='container'>
      <div className='row'>
        {
          props.data.map((i: any, index: number) => {
            return (
              <GroupItem
                key={index}
                item={i}
                expoId={props.expoId}
                col='col s12 m6 l4' />
            );
          })
        }
      </div>
    </div>
  );
};

export default GroupGrid;
