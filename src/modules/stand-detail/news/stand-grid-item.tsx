import React from 'react';
import StandNewsItem from 'src/modules/stand-detail/news/stand-news-item';
import 'src/modules/stand-detail/news/stand-news-item.scss';

const StandGridItems = (props: any): React.ReactElement => {
  return (
    <div className='StandGridItems'>
      <div className='row'>
      {
        props.stand.data.map((element: any, index: number) => {
          return (
            <StandNewsItem
              key={index}
              size='col s12 m4'
              colorcard='white'
              borderRadius='10px'
              image={element.attributes.img_picture}
              imageRadius='10px 10px 0 0'
              title_color='grey-text text-darken-4'
              title={element.attributes.title}
              align='center-align'
              truncate='truncate' />
          );
        })
      }
      </div>
    </div>
  );
};

export default StandGridItems;

