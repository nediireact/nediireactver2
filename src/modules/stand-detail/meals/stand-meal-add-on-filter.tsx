import React from 'react';

const AddOnsComponent = (props: any): React.ReactElement => {
  const updateAddOnFilter = (e: any) => {
    return props.updateItems({ addOn: Number(e.target.value) });
  };

  return (
    <>
    <span className='StandFilters__title'>Ingredientes adicionales</span>
    <label key={0} className='StandFilters__classification'>
      <input name='group1' type='radio' value={0} onChange={updateAddOnFilter} />
      <span>Ninguno</span>
    </label>
    {
      props.addOns && props.addOns.length ?
      props.addOns.map((i: any, index: number) => {
          return (
            <label key={index} className='StandFilters__classification'>
              <input name='group1' type='radio' value={i.id} onChange={updateAddOnFilter} />
              <span>{i.attributes.title}</span>
            </label>
          );
        }) : null
    }
    </>
  );
};
export default AddOnsComponent;
