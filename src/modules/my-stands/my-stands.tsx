import React, {
  useState,
  useEffect
} from 'react';
import { useSelector } from 'react-redux';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import StrongText from 'src/modules/strong-text/strong-text';
import APISDK from 'src/api/api-sdk/api-sdk';
import MyStandItem from 'src/modules/my-stands/stand-item';
import AddStandForm from 'src/modules/my-stands/add-stand-from';

const MyStands = (): React.ReactElement => {
  const userData = useSelector((state: any) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const userStands = userData && userData.userStands && userData.userStands.length ? userData.userStands : [];

  useEffect(() => {
    const w: any = window;
    w.scrollTo(0, 0);
    setIsLoading(true);
    APISDK.GetUserStands()
      .then(() => {
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        console.log(error);
      });
  }, [APISDK]);

  return (
    <div className='col s12 m8'>
      <StrongText
        fullWidth={true}
        align='left'
        text={`${userStands.length} Empresa${userStands.length === 1 ? '' : 's'} registrada${userStands.length === 1 ? '' : 's'}`} />
      <HorizontalSpace size='x-small' />
      <div className='row'>
      {
        userStands && userStands.length ?
        userStands.map((i: any, index: number) => {
          return (
            <MyStandItem
              key={index}
              item={i} />
          );
        }) : null
      }
      </div>
      <HorizontalSpace size='small' />
      <AddStandForm
        isLoading={isLoading}
        setIsLoading={setIsLoading} />
    </div>
  );
};

export default MyStands;
