import React from 'react';

const ExpoHeaderPicture = (props: any): React.ReactElement => {
  return (
    <div>
      <div
        className='ExpoHeaderPicture'
        style={{backgroundImage: `url(${props.image})`}}>
      </div>
    </div>
  );
};

export default ExpoHeaderPicture;
