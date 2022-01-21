import React from 'react';
// import 'src/modules/stand-detail/stand-detail.scss';
import TextWithIcon from 'src/modules/text-with-icon/text-with-icon';

const StandPhones = (props: any): React.ReactElement => {
  return (
    <div className='Stand__phones grey lighten-3'>
      <div className='Stand__phones-title'>{props.title}</div>
      <div className='Stand__phones-row row'>
        {
          props.phones.map((element: any, index: number) => {
            return (
            <TextWithIcon
              key={index}
              color_item='white'
              use='tel:'
              link={element.attributes.phone}
              size='col s12 xl6'
              color_icon='grey-text text-darken-4'
              icon='call'
              text_color='grey-text text-darken-4'
              text={element.attributes.phone}/>
            );
          })
        }
      </div>
  </div>
  );
};

export default StandPhones;
