import React from 'react';
import SimpleAttribute from 'src/modules/simple-attribute/simple-attribute';
import Title from 'src/modules/title/title';

const GenericHeadDetail = (props: any): React.ReactElement => {
  return (
    <>
      <SimpleAttribute text='Ventas: ' attribute={props.times_selled} size='small'/>
      <SimpleAttribute text='Categoria: ' attribute={props.category} size='small'/>
      <Title text={props.name} fullWidth={true}/>
    </>
  );
};

export default GenericHeadDetail;
