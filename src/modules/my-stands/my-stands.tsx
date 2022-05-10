import React, {
  useEffect,
  useState
} from 'react';
import { useSelector } from 'react-redux';
import {
  HorizontalSpace,
  StrongText,
  MenuChoiceMenu,
  LoadingIndicator
} from 'rrmc';
import MyStandItem from './stand-item';
import AddStandBasicInfo from './add-stand-basic-info';
import AddStandMultimedia from './add-stand-multimedia';
import AddSocialMedia from './add-social-media';
import './my-stands.scss';
import LoadMyStands from './load-my-stands';

const menuItems = [
  {
    name: 'Informacion basica',
    value: 'step-1',
    icon: 'house'
  },
  {
    name: 'Mulimedia',
    value: 'step-2',
    icon: 'image'
  },
  {
    name: 'Redes sociales',
    value: 'step-3',
    icon: 'group'
  },
  {
    name: 'Comunica...',
    value: 'step-5',
    icon: 'language'
  }
];

const MyStands = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [valueReference, setValueReference] = useState('');
  const userData = useSelector((state: any) => state.user);
  const userStands = userData && userData.userStands && userData.userStands.length ? userData.userStands : [];
  const [stand, setStand]: any = useState(null);

  useEffect(() => {
    const w: any = window;
    w.scrollTo(0, 0);
  }, [window]);

  return (
    <div className='col s12 m8 MyStands'>
      <LoadMyStands setIsLoading={setIsLoading} />
      <LoadingIndicator isLoading={isLoading} />
      {
        stand || valueReference === 'add-stand' ?
          <div onClick={(e: any) => {
            e.preventDefault();
            setValueReference('');
            setStand(null);
          }} className='MyStands__return-button'>
            <i className='material-icons white cyan-text'>arrow_back</i>
            <span>Regresar</span>
          </div> : null
      }
      {
        stand ?
        <>
        {
          valueReference !== 'add-stand' ?
            <MenuChoiceMenu
              color='cyan'
              items={menuItems}
              valueReference={valueReference}
              setValueReference={setValueReference} /> : null
        }
        {
          valueReference === 'step-1' ?
            <>
            <AddStandBasicInfo
              stand={stand}
              setStand={setStand}
              isLoading={isLoading}
              setIsLoading={setIsLoading} />
            </> : null
        }
        {
          valueReference === 'step-2' ?
            <>
            <AddStandMultimedia
              stand={stand}
              setStand={setStand}
              isLoading={isLoading}
              setIsLoading={setIsLoading} />
            </> : null
        }
        {
          valueReference === 'step-3' ?
            <>
            <AddSocialMedia
              stand={stand}
              setStand={setStand}
              isLoading={isLoading}
              setIsLoading={setIsLoading} />
            </> : null
        }
        </> : null
      }
      {
        !valueReference && !stand ?
        <>
          <StrongText
            fullWidth={true}
            align='left'
            text={`${userStands.length} Empresa${userStands.length === 1 ? '' : 's'} registrada${userStands.length === 1 ? '' : 's'}`} />
          <HorizontalSpace size='x-small' />
          <div className='row MyStands__stands-wrapper'>
            <MyStandItem
              setStand={setStand}
              valueReference={valueReference}
              setValueReference={setValueReference} />
            {
              userStands && userStands.length ?
              userStands.map((i: any, index: number) => {
                return (
                  <MyStandItem
                    key={index}
                    item={i}
                    stand={stand}
                    setStand={setStand}
                    valueReference={valueReference}
                    setValueReference={setValueReference}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading} />
                );
              }) : null
            }
          </div>
        </> : null
      }
      {
        valueReference === 'add-stand' ?
          <AddStandBasicInfo
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setStand={setStand} /> : null
      }
    </div>
  );
};

export default MyStands;
