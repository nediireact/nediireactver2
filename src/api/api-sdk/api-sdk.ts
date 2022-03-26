import Login from 'src/api/api-sdk/login';
import UpdateUser from 'src/api/api-sdk/update-user';
import UpdateUserProfile from 'src/api/api-sdk/update-user-profile';
import GetNediiPlans from 'src/api/api-sdk/get-nedii-plans';
import UpgradeUserToSeller from 'src/api/api-sdk/upgrade-user-to-seller';

const APISDK = {
  Login: Login,
  UpdateUser: UpdateUser,
  UpdateUserProfile: UpdateUserProfile,
  GetNediiPlans: GetNediiPlans,
  UpgradeUserToSeller: UpgradeUserToSeller
};

export default APISDK;
