import React from 'react';
import 'src/modules/generic-item-detail/generic-item-detail.scss';
import StrongText from 'src/modules/strong-text/strong-text';

const GenericItemDetailFeatures = (props: any): React.ReactElement => {
  return (
    <>
      <StrongText text='Caracteristicas'/>
      {
        props.features.data.map((item: any, index: number) => {
          return (
            <ul key={index} className='GenericItemDetailFeatures'>
              <i className='material-icons cyan-text'>lens</i>{item.attributes.name}
            </ul>
          );
        })
      }
    </>
  );
};

export default GenericItemDetailFeatures;
