import React from 'react';
import StrongText from 'src/modules/strong-text/strong-text';
import TextWhitIconInfo from 'src/modules/text-with-icon/text-with-icon-info';

const GenericItemDetailFeatures = (props: any): React.ReactElement => {
  return (
    <>
    {
      props.features && props.features.data && props.features.data.length ?
      <>
        <StrongText text='Caracteristicas'/>
        {
          props.features.data.map((item: any, index: number) => {
            return (
              <TextWhitIconInfo
                key={index}
                colorIcon='cyan-text'
                icon='check'
                text={item.attributes.name} />
            );
          })
        }
      </> : null
    }
    </>
  );
};

export default GenericItemDetailFeatures;
