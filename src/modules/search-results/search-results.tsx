import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BuyableItem from 'src/modules/buyable-item/buyable-item';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import ParallaxHeaderImage from 'src/modules/parallax-header-image/parallax-header-image';
import ExpoItem from 'src/modules/expo-grid/expo-item';
import GroupItem from 'src/modules/group-grid/group-item';
import StandItem from 'src/modules/stand-grid/stand-item';

const headerPictureFile = '/assets/search-bg.jpg';

const useQuery = () => {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

const SearchResults = (props: any): React.ReactElement => {
  const system = useSelector((state: any) => state.system);
  const prefix = system.platform.prefix;
  const headerPictureURL = `${prefix}${headerPictureFile}`;
  const params: any = useQuery();
  const query: string = params.get('q');
  const title = `${props.items.length} resultado${props.items.length > 1 ? 's' : ''} para "${query}".`;

  return (
    <>
    <ParallaxHeaderImage
        image={headerPictureURL}
        gradientOpacity='0.2'
        size='x-small'
        title={title} />
    <HorizontalSpace size='small' />
    <div className='container row'>
      {
        props.items && props.items.length ?
          props.items.map((item: any, index: any ) => {
            if ( !item.attributes ) return null;
            if ( item.type === 'Expo' ) {
              return (
                <ExpoItem
                  key={index}
                  item={item}
                  col='col s12 m6 l4' />
              );
            }
            if ( item.type === 'Group' ) {
              return (
                <GroupItem
                  key={index}
                  item={item}
                  expoId={props.expoId}
                  col='col s12 m6 l4' />
              );
            }
            if ( item.type === 'Stand' ) {
              return (
                <StandItem
                  key={index}
                  item={item} />
              );
            }
            return (
              <BuyableItem
                key={index}
                item={item} />
            );
          }) : null
      }
    </div>
    <HorizontalSpace size='small' />
    </>
  );
};

export default SearchResults;
