import React from 'react';
import SectionsBusinessCard from 'src/modules/business-card/sections-business-card';

const BusinessCard = (props: any): React.ReactElement => {

  return (
    <>
      <SectionsBusinessCard stand={props.stand} />
    </>
  );
};

export default BusinessCard;
