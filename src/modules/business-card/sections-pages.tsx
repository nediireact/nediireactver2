import React from 'react';
import StrongText from 'src/modules/strong-text/strong-text';
import BasicText from 'src/modules/basic-text/basic-text';
import SubTitle from 'src/modules/sub-title/sub-title';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import StandDetailGallery from 'src/modules/stand-detail-gallery/stand-detail-gallery';
import BuyableItem from 'src/modules/buyable-item/buyable-item';

export const AboutUs = (props: any): React.ReactElement => {
  const stand = props.stand;
  return (
    <div>
      <div className='col s12 m6'>
        {
          stand.relationships.owner ?
          <SubTitle text={`${stand.relationships.owner.data.attributes.first_name} ${stand.relationships.owner.data.attributes.last_name}`} /> : null
        }
        <StrongText text={stand.attributes.short_description} />
        <BasicText text={stand.attributes.about} />
      </div>
      <div className='col s12 m6'>
        {
          stand.relationships.owner ?
            <div
              style={{backgroundImage: `url(${stand.relationships.owner.data.attributes.profile.img_picture})`}}
              className='BusinessCard__image_profile'>
            </div> : null
        }
      </div>
    </div>
  );
};

export const TheCompany = (props: any): React.ReactElement => {
  const stand = props.stand;
  return (
    <div>
      <div className='col s12 m8'>
        <SubTitle text='Misión' align='left' fullWidth={true} />
        <BasicText text={stand.attributes.mission} style='normal' />
        <HorizontalSpace size='small'/>
        <SubTitle text='Visión' align='left' fullWidth={true} />
        <BasicText text={stand.attributes.vision} style='normal' />
      </div>
      <div className='col s12 m4 BusinessCard__gallery'>
        <StandDetailGallery
          images={stand.relationships.pictures.data}
          sizeGallery='small' />
      </div>
    </div>
  );
};

export const StarProductItem = (props: any): React.ReactElement => {
  const stand = props.stand;
  return (
    <>
      {
        stand.data.map((i: any, index: number) => {
          return (
            <div className='col s6 m4 l3' key={index}>
              <BuyableItem
              fullWidth={true}
              mini={true}
              item={i} />
            </div>
          );
        })
      }
    </>
  );
};

export const StarProducts = (props: any): React.ReactElement => {
  const stand = props.stand;
  return (
    <div>
      <StarProductItem stand={stand.relationships.highlighted_products} />
      <StarProductItem stand={stand.relationships.highlighted_meals} />
      <StarProductItem stand={stand.relationships.highlighted_services} />
      <StarProductItem stand={stand.relationships.highlighted_real_estates} />
      <StarProductItem stand={stand.relationships.highlighted_vehicles} />
    </div>
  );
};
