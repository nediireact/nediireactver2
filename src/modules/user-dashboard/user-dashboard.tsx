import React from 'react';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import { useSelector } from 'react-redux';

const UserDashboard = (): React.ReactElement => {
  const userData = useSelector((state: any) => state.user);
  const user = userData && userData.user && userData.user.attributes ?
    userData.user.attributes : {};
  const profile = userData && userData.userProfile && userData.userProfile.attributes ?
    userData.userProfile.attributes : {};

  return (
    <div className='col s12 m8'>
      <HorizontalSpace size='x-small' />
      User Dashboard
      {user.first_name} {profile.owner_position}
    </div>
  );
};

export default UserDashboard;
