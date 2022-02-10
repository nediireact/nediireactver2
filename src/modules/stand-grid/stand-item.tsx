import React from 'react';
import { Link } from 'react-router-dom';
import StrongText from 'src/modules/strong-text/strong-text';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import Ratings from 'src/modules/ratings/ratings';
import 'src/modules/stand-grid/stand-grid.scss';

const StandItem = (props: any): React.ReactElement => {
  const logo = props.item.attributes.img_logo;
  return (
    <div className='col s12 m6 l4 StandItem'>
      <Link to={`/empresa/${props.item.attributes.slug}`} className='GenericCard'>
        <div
          className='StandItem__cover'
          style={{backgroundImage: `url(${props.item.attributes.img_cover})`}}>
          <div
            className='StandItem__logo'
            style={{backgroundImage: `url(${logo})`}}></div>
        </div>
        {
          props.item.attributes.restaurant ?
            <i className='material-icons white-text red StandItem__restaurant'>restaurant</i> : null
        }
        <HorizontalSpace size='medium'/>
        <Ratings
          score={props.item.attributes.average_rating}
          size='large'
          centered={true} />
        <StrongText text={props.item.attributes.name}/>
        { props.item.attributes.slogan ?
          <span className='StandItem__slogan truncate grey-text text-darken-2'>
          {props.item.attributes.slogan}
          </span> : null
        }
      </Link>
    </div>
  );
};

export default StandItem;
