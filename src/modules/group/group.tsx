import React, {
  useEffect,
  useState } from 'react';
import GroupItem from 'src/modules/group/group-item';
import fetchData from 'src/modules/utils/fetch-data';
import 'src/modules/group/group.scss';

const apiItem = {
  data: [{
    id: 0,
    attributes: {
      img_picture: '',
      icon: '',
      title: '',
      color: ''
    }
  }]
};

const Group = (): React.ReactElement => {
  const [group, setgroup]: any = useState(apiItem);
  useEffect(() =>{
    fetchData('groups')
      .then((information: any) =>{
        setgroup(information);
      });
  }, [fetchData]);

  return (
    <div className='container'>
      <div className='row'>
        {
          group.data.map((GroupI: any, index: number) => {
            return (
              <GroupItem
                key={index}
                GroupI={GroupI}/>
            );
          })
        }
      </div>
    </div>
  );
};

export default Group;
