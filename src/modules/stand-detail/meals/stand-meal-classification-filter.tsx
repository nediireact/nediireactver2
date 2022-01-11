import React from 'react';

const ClassificationComponent = (props: any): React.ReactElement => {
  const updateClassificationFilter = (e: any) => {
    const value: string = e.target.value;
    const add: boolean = e.target.checked ? true : false;
    const classifications: string[] = props.activeClassifications;
    if ( add ) {
      classifications.push(value);
    } else {
      const index = classifications.indexOf(value);
      classifications.splice(index, 1);
    }
    props.updateItems({classifications: classifications});
  };

  return (
    <>
    <span className='StandFilters__name'>Clasificaciones</span>
    {
      props.classifications && props.classifications.length ?
        props.classifications.map((i: any, index: number) => {
          return (
            <label key={index} className='StandFilters__classification'>
              <input type='checkbox' value={i.id} onChange={updateClassificationFilter} />
              <span>{i.attributes.name}</span>
            </label>
          );
        }) : null
    }
    </>
  );
};

export default ClassificationComponent;
