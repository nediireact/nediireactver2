import React from 'react';
import GroupItem from 'src/modules/group/group-item';
import 'src/modules/group/group.scss';

const Group = ( props: any ): React.ReactElement => {

  return (
    <div className='container'>
      <div className='row'>
        {
          props.data.data.map((i: any, index: number) => {
            return (
              <GroupItem
                key={index}
                item={i}/>
            );
          })
        }
      </div>
    </div>
  );
};

export default Group;
