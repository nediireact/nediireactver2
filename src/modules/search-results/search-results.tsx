import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  HorizontalSpace,
  SubTitle
} from 'rrmc';
import BuyableItemAdapter from 'src/adapters/buyable-item-adapter/buyable-item-adapter';
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
  const title = `${props.results.count ? props.results.count : 0} resultado${props.results.count > 1 ? 's' : ''} para "${query}".`;

  return (
    <>
    <ParallaxHeaderImage
        image={headerPictureURL}
        gradientOpacity='0.2'
        size='x-small'
        title={title} />
    <div className='container'>
      <HorizontalSpace size='small' />
      {
        props.results && props.results.items && props.results.items.length ?
          <div className='row'>
          <HorizontalSpace size='small' />
          <SubTitle
            text={`${props.results.items.length} elemento${props.results.count > 1 ? 's' : ''}`}
            align='left'
            fullWidth={true} />
          <HorizontalSpace size='small' />
          {
            props.results.items.map((item: any, index: any ) => {
              return (
                <BuyableItemAdapter
                  key={index}
                  item={item} />
              );
            })
          }
          </div> : null
      }
      {
        props.results && props.results.stands && props.results.stands.length ?
          <div className='row'>
          <HorizontalSpace size='small' />
          <SubTitle
            text={`${props.results.stands.length} empresas`}
            align='left'
            fullWidth={true} />
          <HorizontalSpace size='small' />
          {
            props.results.stands.map((item: any, index: any ) => {
              return (
                <StandItem
                  key={index}
                  item={item} />
              );
            })
          }
          </div> : null
      }
      {
        props.results && props.results.groups && props.results.groups.length ?
          <div className='row'>
          <HorizontalSpace size='small' />
          <SubTitle
            text={`${props.results.groups.length} categorías`}
            align='left'
            fullWidth={true} />
          <HorizontalSpace size='small' />
          {
            props.results.groups.map((item: any, index: any ) => {
              return (
                <GroupItem
                  key={index}
                  item={item}
                  expoId={props.expoId}
                  col='col s12 m6 l4' />
              );
            })
          }
          </div> : null
      }
      {
        props.results && props.results.expos && props.results.expos.length ?
          <div className='row'>
          <HorizontalSpace size='small' />
          <SubTitle
            text={`${props.results.expos.length} expos`}
            align='left'
            fullWidth={true} />
          <HorizontalSpace size='small' />
          {
            props.results.expos.map((item: any, index: any ) => {
              return (
                <ExpoItem
                  key={index}
                  item={item}
                  col='col s12 m6 l4' />
              );
            })
          }
          </div> : null
      }
    </div>
    <HorizontalSpace size='medium' />
    </>
  );
};

export default SearchResults;
